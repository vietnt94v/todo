# Shared PostgreSQL database

`todo-db` owns the local PostgreSQL server, its volume, and database-wide
bootstrap SQL. APIs do **not** run their own PostgreSQL containers; they all
read the credentials from this directory's untracked `.env` file.

## Start it

```bash
cd todo-db
cp .env.example .env
# edit .env and replace POSTGRES_PASSWORD
docker compose up -d --build
docker compose ps
```

The database is reachable from your host at `localhost:${POSTGRES_HOST_PORT}`
(by default `localhost:5432`). Data is kept in the named Docker volume
`todo-postgres-data`, so stopping or rebuilding the container does not remove it.

Useful commands:

```bash
docker compose logs -f postgres
docker compose exec postgres psql -U todo_app -d todo
docker compose down
```

`docker compose down -v` also deletes the database data volume. Use it only
when you intentionally want a fresh local database.

## How APIs share the configuration

Each API should load `../todo-db/.env` locally (or receive the same values via
its environment/secret manager in CI and production). Keep framework-specific
connection strings out of `todo-db`; they are only a mapping of these common
PostgreSQL values.

For a shell session, from an API folder:

```bash
set -a
source ../todo-db/.env
set +a
```

Then configure the framework with these equivalents:

| API | Connection setting |
| --- | --- |
| .NET | `ConnectionStrings__TodoDb=Host=localhost;Port=$POSTGRES_HOST_PORT;Database=$POSTGRES_DB;Username=$POSTGRES_USER;Password=$POSTGRES_PASSWORD` |
| Spring Boot | `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:$POSTGRES_HOST_PORT/$POSTGRES_DB`, plus `SPRING_DATASOURCE_USERNAME=$POSTGRES_USER` and `SPRING_DATASOURCE_PASSWORD=$POSTGRES_PASSWORD` |
| PHP PDO | `pgsql:host=localhost;port=$POSTGRES_HOST_PORT;dbname=$POSTGRES_DB`, with `$POSTGRES_USER` / `$POSTGRES_PASSWORD` |

If an API runs **inside Docker Compose**, its host is `postgres` and its port is
`5432` (not `localhost`). Put that API in the same Compose project/network.

## Schema and migrations

Put only global, safe bootstrap SQL in `init/` (for example, extensions or
roles). PostgreSQL executes those files only when the data volume is first
created. Table migrations should be versioned with the owning API (EF Core
migrations for .NET, Flyway/Liquibase for Java, etc.). This prevents one API
from silently changing another API's schema.

When separate APIs need isolated data, create a database per service or give
each one a dedicated schema and DB role; they can still use this same PostgreSQL
container and central `.env` setup.
