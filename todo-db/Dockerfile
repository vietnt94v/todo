FROM postgres:16-alpine

# Put only database-wide, idempotent bootstrap SQL in this directory.
# Application table migrations should remain owned by the API that uses them.
COPY init/ /docker-entrypoint-initdb.d/
