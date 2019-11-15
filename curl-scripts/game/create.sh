curl "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "games": {
      "ID": "'"${ID}"'",
      "cells": "'"${CELLS}"'",
      "over": "'"${OVER}"'",
      "player_x": {
        "id": "'"${PLAYERXID}"'",
        "email": "'"${PLAYERXEMAIL}"'"
      },
      "player_o": {
        "id": "'"${PLAYEROID}"'",
        "email": "'"${PLAYEROEMAIL}"'"
      }
    }
  }'

echo
