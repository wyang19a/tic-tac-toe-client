curl "https://tic-tac-toe-wdi.herokuapp.com/sign-out" \
  --include \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --request DELETE \

echo
