# https://mdprog.com/
# https://kaomandy.com/
# https://devalto.kaomandy.com/
## Info perso
- mail: rt1jocelyn@gmail.com
- tel: +261 32 97 740 62

## Installation project
```shell
composer install
npm install
mkdir -p config/jwt
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```
## Launch project
```shell
yarn watch
```
