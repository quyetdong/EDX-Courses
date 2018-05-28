curl "http://localhost:3002/profile" -i
curl "http://localhost:3002/profile" -H "Content-Type: application/json" -X POST -d '{ "frist_name": "Azat", "last_name": "Denkins", "url": "abc" }' -i 
sleep 1
curl "http://localhost:3002/profile" -H "Content-Type: application/json" -X PUT -d '{ "id": 21, "frist_name": "Doughlas", "last_name": "John" }' -i 
sleep 1
curl "http://localhost:3002/profile" -i 
sleep 1
curl -X DELETE "http://localhost:3002/profile" -i
 