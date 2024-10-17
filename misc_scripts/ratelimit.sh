for ((i=1; i<=200; i++)); do
  curl -X POST \
    http://localhost:3000/v1/api/user/login\
    -H 'Content-Type: application/json' \
    -d '{"email": "toearkar@protonmail.com", "password": "tesT1234!"}'
done