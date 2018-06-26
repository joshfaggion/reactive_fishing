require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'sinatra/base'
require './lib/game.rb'
require 'sinatra/json'
require 'json'

class Server < Sinatra::Base
  enable :sessions

  configure :development do
    register Sinatra::Reloader
  end

  post('/join') do
    push = JSON.parse(request.body.read)
    json push
  end
end
