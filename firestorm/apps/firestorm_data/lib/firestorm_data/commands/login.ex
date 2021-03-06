defmodule FirestormData.Commands.Login do
  use FirestormData.Command

  defstruct [:username, :password]

  def run(%__MODULE__{username: username, password: password}) do
    # FIXME: We aren't storing passwords yet lol
    case password do
      "secret" ->
        query =
          from u in User,
            where: u.username == ^username

        case Repo.one(query) do
          nil ->
            {:error, :invalid_credentials}

          user ->
            {:ok, user.id}
        end

      _ ->
        {:error, :invalid_credentials}
    end
  end
end
