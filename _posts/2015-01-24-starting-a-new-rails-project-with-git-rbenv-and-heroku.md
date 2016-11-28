---
layout: post
category: ruby
---
## Update Gems

```ruby
gem update
```

## Install Rails (if not already installed)

Specify the version with -v followed by the release

```ruby
gem install rails -v 4.2.0
```

## Install a specific Ruby version (if not already installed)

First update and install rbenv if necessary

```ruby
brew update
brew upgrade rbenv ruby-build
```

Install the Ruby version

```ruby
rbenv install 2.2.0
```

You can use rbenv install -l to list all available versions

```ruby
rbenv install -l
```

Set the Ruby version either for the current directory or for your entire system

```ruby
rbenv local 2.2.0  # Current directory
rbenv global 2.2.0  # System-wide
```

Then rehash to install all shims ([what are shims?](http://stackoverflow.com/a/9422296/1890620)) known to rbenv

```ruby
rbenv rehash
```

## Create the Rails App

Now create a new Rails app by specifying the desired Rails version

```ruby
rails _4.2.0_ new my_app
```

Make your Gemfile edits and then update your bundle

Add just below source in the Gemfile

```ruby
ruby '2.2.0'
```

Move sqlite3 to development group

For all environments

```ruby
gem 'bcrypt'  # for strong-passwords
gem 'bootstrap-sass'  # to style with Bootstrap
gem 'puma'  # recommended web server by Heroku
```

For development

```ruby
gem 'pry'  # for binding-pry
gem 'dotenv-rails'  # for sensitive data management
```

Create a production group

```ruby
group :production do
  gem 'pg' #postgres database
  gem 'rails_12factor'
end
```

Add `puma.rb` to `/config` with the following

```ruby
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
```

Install --without production

```ruby
bundle install --without production
```

## Setup Git

```ruby
git init  # Initializes the local repository
git add -A  # Adds all of the files in the directory to the repository
git commit -m 'Initialize repository'  # The initial commit
```

Head out to Github or Bitbucket and create a corresponding repository and then add it to the local Git repository.

```ruby
git remote add origin git@github.com:rickpeyton/my_app.git
git push -u origin --all
```

## Deploy to Heroku

Add a simple hello message  to your routes.rb file just to verify things are working

```ruby
root 'application#hello'
```

And add a method inside the applications controller

```ruby
def hello
  render text: 'hello world'
end
```

And commit

```ruby
git commit -am 'Add hello'
```

Create your heroku slice

```ruby
heroku create
```

A trick I picked up from the Rails Tutorial is to jump into irb and come up with a random string for your heroku app name

```ruby
('a'..'z').to_a.shuffle[0..7].join
```

Then rename your heroku slice

```ruby
heroku rename tbxejdfg
```

And push your app to heroku

```ruby
git push heroku master
```
