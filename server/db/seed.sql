-- Seed users
-- admin@kudos.com / 123456
-- user@kudos.com  / 123456

INSERT INTO users (name, email, password, role, age) VALUES
  ('Admin', 'admin@kudos.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'admin', 30),
  ('User', 'user@kudos.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'user', 25)
ON CONFLICT (email) DO NOTHING;
