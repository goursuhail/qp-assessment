# Grocery Booking API

## Server Start Command
To start the server in development mode, run:
```sh
npm run start:dev
```

## Create Migration Command
To create a new migration for database schema changes, use:
```sh
typeorm migration:create db/migrations/create-user-entity
```

## Run Migration Command
To apply pending migrations and update the database schema, execute:
```sh
npm run migration:run
```

## Revert Migration Command
To roll back the last applied migration, use:
```sh
npm run migration:revert
```

