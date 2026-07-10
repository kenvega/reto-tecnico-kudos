-- Seed users
-- admin@kudos.com / 123456
-- user@kudos.com  / 123456

INSERT INTO users (email, password, role) VALUES
  ('admin@kudos.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'admin'),
  ('user@kudos.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'user')
ON CONFLICT (email) DO NOTHING;
