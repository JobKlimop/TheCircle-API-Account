# TheCircle-API-Account
 <p>master  :</p><img src='https://travis-ci.org/mikakrooswijk/TheCircle-API-Account.svg?branch=master'>
 <p>develop :</p><img src='https://travis-ci.org/mikakrooswijk/TheCircle-API-Account.svg?branch=develop'>

 <p>online on Heroku host: https://the-circle-account.herokuapp.com/</p>
 
 

<p>HTTPS POST request to https://the-circle-account.herokuapp.com/api/account/register to register a new user:</p>

```
{
	"user": {
		"username":  "username",
		"email": "email",
		"slogan": "slogan"
	},
	"password": "password"
}
```

<p>HTTPS POST request to https://the-circle-account.herokuapp.com/api/account/login to login and get a privatekey, certificate, and JSON webtoken:</p>

```
{
 "username":"username",
 "password":"password"
}
```
