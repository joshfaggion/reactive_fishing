require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'sinatra/base'
require './lib/game.rb'
require 'sinatra/json'
require 'json'
require './lib/request'
require './lib/response'

class Server < Sinatra::Base
  enable :sessions
  @@name = ''
  json = File.read('names.json')
  @@array_of_names = JSON.parse(json)
  @@bot_names = []
  @@game = false

  def self.run_bot_turn(bot_name)
    bot = @@game.players_array[@@game.find_player_by_name(bot_name) - 1]
    if bot.cards_left == 0
      @@game.next_turn
    else
      target_card = bot.player_hand[rand(bot.cards_left)]
      possible_targets = []
      target_player = bot
      until target_player.name != bot.name && target_player.cards_left > 0
        target_player = @@game.players_array[rand(@@game.players_array.length - 1)]
      end
      result = @@game.run_round(Request.new(@@game.players_array.index(bot) + 1, target_card.rank, @@game.players_array.index(target_player) + 1).to_json)
    end
  end

  def self.game_state
    number_of_bots = @@num_of_players.to_i
    {
      player_cards: @@player.img_compatible_cards,
      player_name: @@player.name,
      num_of_players: @@num_of_players,
      bots: self.return_bot_stats(@@game),
      turn: @@game.turn,
      cardsLeftInDeck: @@game.cards_left,
      game_log: @@game.last_five_responses,
      player_matches: @@player.display_matches,
      game_over: @@game.winner?,
      who_is_winner: @@game.who_is_winner
      }
  end

  def self.initialize_game(num_of_players)
    @@game = Game.new(num_of_players)
    @@player = @@game.create_player(@@name)
    number_of_bots = @@num_of_players.to_i - 1
    number_of_bots.times do
      @@bot_names.push(@@array_of_names['names'][rand(@@array_of_names['names'].length)])
    end
    bots = @@game.fill_up_with_robots(@@bot_names)
    @@game.begin_game()
  end

  def self.return_bot_stats(game)
    overall_array = []
    @@game.players_array.each_with_index do |player, index|
      unless index == 0
        array = []
        # It has to be one less then index, because index is from the players_array, not the bot_names.
        array.push(@@bot_names[index - 1])
        array.push(player.img_compatible_cards)
        array.push(player.display_matches)
        overall_array.push(array)
      end
    end
    return overall_array
  end

  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
    if @@game
      @@game.reset_game
    end
    push = JSON.parse(request.body.read)
    @@name = push['name']
  end

  post('/num_of_players') do
    push = JSON.parse(request.body.read)
    @@num_of_players = push['numOfPlayers']
    self.class.initialize_game(@@num_of_players)
    hash = {status: 200}
    json hash
  end

  get('/game') do
    json self.class.game_state
  end

  get('/component_to_render') do
    if @@game
      hash = {game_existing: true}
    else
      hash = {game_existing: false}
    end
    json hash
  end

  post('/request') do
    push = JSON.parse(request.body.read)
    player_num = @@game.find_player_by_name(push['currentPlayer'])
    target_num = @@game.find_player_by_name(push['targetPlayer'])
    target_card = push['targetCard']
    if target_card == 'k'
      target_card = 'king'
    elsif target_card == 'j'
      target_card = 'jack'
    elsif target_card == 'q'
      target_card = 'queen'
    elsif target_card == 'a'
      target_card = 'ace'
    end
    result = @@game.run_round(Request.new(player_num, target_card, target_num).to_json)
    if @@player.cards_left == 0 && @@game.cards_left == 0
      @@game.next_turn
    end
    until @@game.turn == 1
      if @@player.cards_left < 1
        until @@game.winner?
          self.class.run_bot_turn(@@bot_names[@@game.turn - 2])
        end
        break
      else
        self.class.run_bot_turn(@@bot_names[@@game.turn - 2])
      end
    end
    hash = {message: "GameIsReady"}
    json hash
  end

  get('/winner') do
    winners = @@game.who_is_winner()
    hash = {}
    if winners.class == Array
      winners_array = []
      winners.each do |card|
        winners_array.push(card.string_value)
      end
      winners_string = winners_array.join(", ")
      hash = {message: "#{winners_string} tied with #{winners[0].points} points!"}
    else
      hash = {message: "#{winners.name} won the game with #{winners.points} points!"}
    end
    json hash
  end
end
