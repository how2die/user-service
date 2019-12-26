# User Service

User management service.

Provides authentication using JSON Web Tokens.

## Getting started

### Prerequisites

* Kubernetes cluster with kubectl access
* Properly configured database, see `/app/config/sequelize.js`

### Create private key for token encryption

Create a secure private key and store it as a secret:
```
kubectl create secret generic user-private-key --from-literal=private-key=<PRIVATE KEY>
```

### Deploying to Kubernetes

Deploy to Kubernetes by running:
```
kubectl apply -f deployment.yaml
```

## Development

To install dependendency:

```
npm install
```

To start development server, run:
```
npm run start:watch
```

## Usage

### Create user
**URL** : `/api/user/users`
**Method** : `POST`
```json
{
	"username": "some-username",
	"password": "some-password"
}
```
Response will return `409 Conflict` if username is taken.
Successful creation will return `201 Created` with a response body with the following structure:

```json
{
	"userid": "some-userid",
	"username": "some-username"
}
```

### Get user by id
**URL** : `/api/user/users/:userid`
**Method** : `GET`

If user exists, returns `200 OK` with user information:
```json
{
	"userid": "some-userid",
	"username": "some-username"
}
```

Otherwise returns `404 Not Found`.

### Create token for user (login)
**URL** : `/api/user/tokens`
**Method** : `POST`
```json
{
    "username": "some-username",
    "password": "some-password"
}
```

Returns  `201 Created` with a token if the credentials are valid:
```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXRzIiwiaWF0IjoxNTYyMzU1MTM4LCJleHAiOjE1OTM4OTExMzgsImF1ZCI6Ind3dy5ob3cyZGllLmNvbSIsInN1YiI6InNvbWUtdXNlcmlkIn0.yNWMaGvbJS-Gj8EZ8f4rFu0BT6vTZnPGAakO1EQ-JuU"
}
```

Returns `401 Unauthorized` if the credentials are invalid.

### Validate token
**URL** : `/api/user/tokens/:token`
**Method** : `GET`

Validates the token, returns status code `200 OK` if and only if the token is valid.
