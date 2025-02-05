import Config

# this file will allow you to override the default configuration for the dev environment
# to do so you need to copy this file to .env.exs and change the values as needed

# Configure your database
config :portfolio, Portfolio.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "portfolio_dev",
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10