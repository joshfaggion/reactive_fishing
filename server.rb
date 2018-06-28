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

  # def self.run_bot_turn(bot_name)
  #   bot = @@game.players_array[@@game.find_player_by_name(bot_name)]
  #   target_card = bot.player_hand[rand(player_hand.length)]
  #   binding.pry
  # end

  def self.game_state
    number_of_bots = @@num_of_players.to_i
    {
      player_cards: @@player.img_compatible_cards,
      player_name: @@player.name,
      num_of_players: @@num_of_players,
      bots: self.return_bot_stats(@@game),
      turn: @@game.turn,
      cardsLeftInDeck: @@game.cards_left,
      game_log: @@game.last_five_responses
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
        # array.push(player.display_matches)
        array.push(["d6", "c8", "s9"])
        overall_array.push(array)
      end
    end
    return overall_array
  end

  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
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
    else
      target_card = target_card.to_i
    end
    result = @@game.run_round(Request.new(player_num, target_card, target_num).to_json)
    # @@bot_names.each do |name|
    #   self.class.run_bot_turn(name)
    # end
    hash = {message: "GameIsReady"}
    json hash
  end
end
