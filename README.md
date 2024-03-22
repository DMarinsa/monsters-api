
# Monsters API

This API is handling the creation, read, update and deletion of Monsters


## Documentation

### Requirements

#### Local environment
- `.env` file in the root of the project
```
MONGO_DB_URI=<YourMongoDBUrlInstance>
```
- `Node.js` installed
#### Docker environment
- Having `docker` and `docker-compose` installed

## How to run
In the root of the project you'll find a Makefile with all necessary commands to run the project both locally or in a docker environment

- To run it locally `make local-run`
- To run it on docker `make run`
- To run the tests `make test`

## API Reference

The API rely on graphQL to handle all requests exposing 3 mutations and 2 queries
#### Post GraphQL

```http
  POST /graphql
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `header` | **Optional**. Bearer token |

### Queries

#### monster

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. The monster id to find|

Returns the monster by id

#### monsters

Returns an array of monsters

### Mutations

#### createMonster

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `monster` | `object` | **Required**. The monster to be created|

#### updateMonster

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `monster` | `object` | **Required**. The monster to be updated|

#### deleteMonster

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. The id of the monster to be deleted|

