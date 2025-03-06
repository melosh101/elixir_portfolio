defmodule PortfolioWeb.AuthController do
  alias PortfolioWeb.UserAuth
  alias Portfolio.Accounts
  alias Ueberauth.Strategy.Helpers
  use PortfolioWeb, :controller
  plug Ueberauth

  def callback(%{assigns: %{ueberauth_failure: %Ueberauth.Failure{}}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    case UserAuth.find_or_create(auth) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Successfully authenticated.")
        |> put_session(:current_user, user)
        |> configure_session(renew: true)
        |> redirect(to: "/")

      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: "/")
    end
  end

  def request(conn, _params) do
    conn
    |> redirect(to: Helpers.callback_url(conn))
  end


end
