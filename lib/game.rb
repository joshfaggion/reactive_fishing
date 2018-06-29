require_relative 'player'
require 'pry'
require_relative 'request'
require_relative 'response'
require_relative 'card_deck'
require 'json'

class Game
  attr_reader :turn, :deck, :players_array
  def initialize(num_of_players)
    @turn = 1
    @players_array = []
    @game_winner = ''
    @deck = CardDeck.new()
    @deck.shuffle
    @responses = []
    @num_of_players = num_of_players
  end

  def create_player(name)
    player = Player.new(name)
    @players_array.push(player)
    return player
  end

  def cards_left
    @deck.cards_left
  end

  def fill_up_with_robots(bot_names)
    num_of_bots = bot_names.length
    num_of_bots.times do |index|
      create_player(bot_names[index])
    end
  end

  def begin_game
    distribute_deck
  end

  def find_player(desired_player)
    players_array[desired_player - 1]
  end

  def run_round(json_request)
    # Turns the json into a normal request object, then returns a response.
    request = Request.from_json(json_request)
    original_fisher = request.fisher
    desired_rank = request.rank
    original_target = request.target
    if original_target.class == String
      original_target = find_player_by_name(original_target)
    end
    if original_fisher.class == String
      original_fisher = find_player_by_name(original_fisher)
    end
    target = find_player(original_target)
    fisher = find_player(original_fisher)
    cards = target.card_in_hand(desired_rank)
    if cards == "Go Fish!"
      card_refills
      go_fish_card = go_fish(original_fisher)
      cards_to_be_deleted = []
      @players_array.each do |player|
        player.player_hand.each do |card|
          if card == nil
            cards_to_be_deleted.push(card)
          end
        end
        cards_to_be_deleted.each do |card|
          player.player_hand.delete(card)
        end
      end
      fisher.pair_cards
      next_turn
      card_refills
      response = Response.new(original_fisher, desired_rank, original_target, false).to_json
      @responses.push(response)
      return response
    else
      fisher.take_cards(cards)
      card_refills
      cards_to_be_deleted = []
      @players_array.each do |player|
        player.player_hand.each do |card|
          if card == nil
            cards_to_be_deleted.push(card)
          end
        end
        cards_to_be_deleted.each do |card|
          player.player_hand.delete(card)
        end
      end
      fisher.pair_cards
      cards_array = []
      cards.each do |card|
        cards_array.push(card.string_value)
      end
      cards_string = cards_array.join(", ")
      response = Response.new(original_fisher, desired_rank, original_target, true, cards_string).to_json
      @responses.push(response)
      return response
    end
  end

  def find_player_by_name(target)
    match = nil
    @players_array.each do |player|
      if player.name.downcase == target.downcase
        match = @players_array.index(player)
      end
    end
    return match + 1
  end

  def go_fish(player)
    the_player = players_array[player - 1]
    top_card = deck.use_top_card
    the_player.take_cards(top_card)
    return top_card
  end

# Finish fixing all the encapsulation.

  def next_turn
    # Changes the turn to the next player.
    if turn < players_array.length
      @turn += 1
    else
      @turn = 1
    end
  end

  def card_refills
    # If the cards are zero, then fill em up!
    players_array.each do |player|
      if player.cards_left == 0
        5.times do
          if deck.cards_left == 0
            return nil
          end
          player.take_cards(deck.use_top_card)
        end
      end
    end
  end

  def winner?
    # Returns a boolean checking to see if everything is empty.
    if deck.cards_left > 0 || deck == nil
      return false
    end
    players_array.each do |player|
      unless player.cards_left < 1
        return false
      end
    end
    return true
  end

  def who_is_winner
    # Returns which player is the winner.
    high_score = 0
    ties = []
    highest_player = ''
    players_array.each do |player|
      if player.points > high_score
        high_score = player.points
        highest_player = player
        ties = []
        ties.push(player)
      elsif player.points == high_score
        ties.push(player)
      end
    end
    if ties.length == 1
      return highest_player
    else
      return ties
    end
  end

  def clear_deck
    deck.clear_deck
  end


  def deck
    @deck
  end

  def last_five_responses
    tmp_responses = []
    usable_responses = []
    if @responses.length == 0
      return ["No moves yet."]
    end
    counter = 0
    @responses.each do |num|
      counter+=1
    end
    if counter > 9
      until @responses.length <= 9
        @responses.shift()
      end
      usable_responses = @responses
    else
      usable_responses = @responses
    end
    usable_responses.each do |json_response|
      response = Response.from_json(json_response)
      fisher = find_player(response.fisher)
      rank = response.rank
      target = find_player(response.target)
      card_found = response.card_found
      card = response.card
      if card_found
        tmp_responses.push("#{fisher.name} took the #{card} from #{target.name}.")
      else
        tmp_responses.push("#{fisher.name} asked #{target.name} for a #{rank}, but he did not have one. Go Fish!")
      end
    end
    return tmp_responses
  end


  def reset_game
    @turn = 1
    @players_array = []
    @game_winner = ''
    @deck = CardDeck.new()
    @deck.shuffle
    @responses = []
  end

  private

  def distribute_deck
    @players_array.each do |player|
      5.times do
        player.take_cards(@deck.use_top_card)
      end
    end
  end
end
