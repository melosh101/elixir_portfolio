defmodule PortfolioWeb.HomeLive do
  use PortfolioWeb, :live_view
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :message, "Hello, world!"), layout: false}
  end
end
