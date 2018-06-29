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
  it 'can select a card and a player', :js do
    visit '/'
    fill_in("name", :with => "Jim")
    click_on("Submit")
    fill_in("players", :with => "3")
    click_on("Submit")
    find('.player-hand', match: :first).click
    find('.player-div', match: :first).click
    click_on("Submit Your Card Request")
    sleep(0.3)
    expect(page.text).to match (/Jim\s\w/)
  end
end
