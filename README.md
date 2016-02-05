## Installation

npm install & npm install

## Avaliable Databases

sqlite
mongodb
postgress
coming soon(mysql, mariaDB)

## Configuration

We need configure 1 Environment variable, and the SECRET API KEY from LATCH and AUTHY:

# DATABASE_URL

With a expression like this:

<protocol>://<user>:<password>@<host>:<port>/<databaseName>

Some fields can be empty, for example:

DATABASE_URL=mongodb://:@localhost:27017/myLogin

If we do not condigure DATABASE_URL, the default value will be:

DATABASE_URL=sqlite://:@:/

# Note sqlite

If we want to use sqlite, wee need configure one more environment variable:

DATABASE_STORAGE=<file>

The default value is users.sqlite

# SECRET API CONFIGURATION
At the moment there are two types of second-factor authentication.
LATCH(https://latch.elevenpaths.com/) and AUTHY(https://www.authy.com/)

So we need to configurate the two secret api key.

in /lib/external/passport/oauth2/latch   -> latch-config.js
and /lib/external/passport/oauth2/authy  -> authy-config.js

and complete the info wich we obtain from de provider

for example:
latch:
    appId: 'MI-API-ID',
    secretKey: 'MY-SECRET-KEY',

authy:
    appId: 'MI-API-ID',
    url: 'http://sandbox-api.authy.com', //only sandbox


## Run aplication

We can run with node:

#npm start

or 

#node app

The server run at port 3000

It is compatible wiht heroku too. in fact we can run it with the comand:

foreman start

If we have heroku toolbelt installed.

Remember that if you use foreman start, the server will be running at port 5000
