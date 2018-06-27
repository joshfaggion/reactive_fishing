require 'rack/test'
require 'rspec'
require 'capybara'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'pry'

ENV['RACK_ENV']

require_relative 'server.rb'

Capybara.configure do |config|
  config.run_server = false
  config.app_host = 'http://localhost:3000'
  config.default_driver = :selenium_chrome_headless
end

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

RSpec.describe Server, type: :feature do
  it 'can go to choose players page', :js do
    visit '/'
    sleep(0.5)
    fill_in("name", :with => "Jim")
    sleep(0.5)
    click_on("Submit")
    sleep(0.5)
    expect(page).to have_content "-Join Game-"
  end

  it 'can go to the game page, and get a player name and some cards', :js do
    visit '/'
    fill_in("name", :with => "Jim")
    click_on("Submit")
    sleep(0.2)
    fill_in("players", :with => "3")
    click_on("Submit")
    sleep(0.2)
    expect(page).to have_content "Jim"
  end
end
