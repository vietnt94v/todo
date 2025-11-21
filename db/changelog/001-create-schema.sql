--liquibase formatted sql

--changeset system:001-create-schema
CREATE SCHEMA IF NOT EXISTS ums;

--rollback DROP SCHEMA IF EXISTS ums CASCADE;

