#!/usr/bin/env ruby

require 'sinatra'
require 'typhoeus'
require 'sinatra/activerecord'
require './environment'

class Endpoint < ActiveRecord::Base ; end

get '/' do
  erb :index
end

get '/endpoints' do
  Endpoint.all.to_json
end

post '/endpoints' do
  Endpoint.create(url: params[:url])
  Endpoint.last.to_json
end

delete '/endpoints/:id' do
  Endpoint.delete(params[:id])
  'ok'
end

post '/post' do
  Endpoint.all.each do |endpoint|
    Typhoeus.post(endpoint.url, body: request.body.string)
  end
  'ok'
end

# can use these endpoints to test
post '/test1' do
  puts "received test1 post #{request.body.string}"
end

post '/test2' do
  puts "received test2 post #{request.body.string}"
end
