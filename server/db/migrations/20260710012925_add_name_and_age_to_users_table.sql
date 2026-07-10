-- migrate:up
ALTER TABLE users ADD COLUMN name TEXT NOT NULL;
ALTER TABLE users ADD COLUMN age INTEGER;

-- migrate:down
ALTER TABLE users DROP COLUMN name;
ALTER TABLE users DROP COLUMN age;
