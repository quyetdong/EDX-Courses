//posts account data
curl -H "Content-Type: application/json" POST -d '{"balance": 100, "name":"checking"}'  "http://localhost:3003/accounts" -i

//updates account data at a specified id
curl -H 'Content-Type: application/json' PUT -d '{"balance": 200, "name": "savings"}'  "http://localhost:3003/accounts/0" -i

//gets account data
curl "http://localhost:3003/accounts" -i

//deletes account data and a specified id
curl -X DELETE "http://localhost:3003/accounts/0" -iv