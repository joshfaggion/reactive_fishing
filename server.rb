require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'sinatra/base'
require './lib/game.rb'
require 'sinatra/json'
require 'json'

class Server < Sinatra::Base
  enable :sessions
  @@name = ''
  json = File.read('names.json')
  @@array_of_names = JSON.parse(json)
  @@bot_names = []

  def self.game_state
    number_of_bots = @@num_of_players.to_i
    {
      player_cards: @@player.img_compatible_cards,
      player_name: @@player.name,
      num_of_players: @@num_of_players,
      bots: self.return_bot_stats(@@game),
      turn: @@game.turn,
      cardsLeftInDeck: 10,
      # This will be taken into function, but its not really necessary right now.
      game_log: @@game.last_five_responses
      }
  end

  def self.initialize_game(num_of_players)
    @@game = Game.new(num_of_players)
    @@player = @@game.create_player(@@name)
    number_of_bots = @@num_of_players.to_i
    number_of_bots.times do
      @@bot_names.push(@@array_of_names['names'][rand(@@array_of_names['names'].length)])
    end
    bots = @@game.fill_up_with_robots(@@bot_names)
    @@game.begin_game()
  end

  def self.return_bot_stats(game)
    overall_array = []
    game.players_array.each_with_index do |player, index|
      unless index == 0
        array = []
        array.push(@@bot_names[index])
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
    @@game = nil
    @@bot_names = []
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
    @@game ||= nil
    if @@game == nil
      hash = {game_existing: false}
      json hash
    else
      hash = {game_existing: true}
      json hash
    end
  end

  post('/request') do
    
  end
end
