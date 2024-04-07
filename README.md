## Getting Started

### Install dependencies

After you cloned project from GitHub repo, open terminal in project and run `npm install`. This will install
all necessary packages to launch project.

### Setup ENV

Copy `.env.example` to `.env` and populate it with missing/relevant environment variables.

### Launch DBs

#### Using Docker

If you have `Docker` installed on your machine just run `docker compose up` to launch development and test DBs.
(use separate terminal since services are running in attached mode)

### Without Docker

Since app is using `PostgreSQL`, download latest version of PostgreSQL from [here](http://postgresql.org/download/) to your computer and install it.
Next launch 2 databases (with `psql` or something) with credentials identical for those you can find in `docker-compose.yml` file.
So for dev db it will be:

```
environment:
  POSTGRES_USER: developer
  POSTGRES_PASSWORD: dev_pass
  POSTGRES_DB: easylib
ports:
  - '5432:5432'
```

For testing db:

```
environment:
  POSTGRES_USER: developer
  POSTGRES_PASSWORD: dev_pass
  POSTGRES_DB: test-easylib
  PGPORT: 5434
ports:
  - '5434:5434'

```

### Run migrations

1. Firsly run migrations on development db. For that ensure your development db is running and run `npm run migrations:reset` (if you will see some questions during command run - choose `yes`). This will clean your DB and run all migrations.

2. Than run migrations on your test DB. To do this, go to `prisma/schema.prisma` and change `url = env("DATABASE_URL")` => `url = env("TEST_DATABASE_URL")`.
   After that go to terminal and run `npm run migrations:reset` (if you will see some questions during command run - choose `yes`).
   ⚠**_DO NOT FORGET TO CHANGE IT BACK_** `url = env("TEST_DATABASE_URL")` => `url = env("DATABASE_URL")`.

### Launch

Thats it! Now you are ready to launch the project, for this run `npm run dev` command. Enjoy😀
Open [http://localhost:3000/api/books](http://localhost:3000/api/books) with your browser to see the result.

### Testing

Since E2E tests are also available in the app, you can run `npm run test:e2e` and see the magic! (Make sure you testing db is running and filled with migrations).
