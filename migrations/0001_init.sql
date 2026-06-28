-- Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT DEFAULT '',
  description TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  group_size TEXT DEFAULT '',
  language TEXT DEFAULT '',
  experience_type TEXT DEFAULT '',
  location TEXT DEFAULT '',
  destination TEXT DEFAULT '',
  category TEXT DEFAULT '',
  price REAL DEFAULT 0,
  currency TEXT DEFAULT '¥',
  image TEXT DEFAULT '',
  images TEXT DEFAULT '[]',
  featured INTEGER DEFAULT 0,
  popular INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  meeting_point TEXT DEFAULT '',
  cancellation_policy TEXT DEFAULT '',
  highlights TEXT DEFAULT '[]',
  included TEXT DEFAULT '[]',
  not_included TEXT DEFAULT '[]',
  itinerary TEXT DEFAULT '[]',
  host_name TEXT DEFAULT '',
  host_instagram TEXT DEFAULT '',
  booking_note TEXT DEFAULT ''
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  description TEXT DEFAULT '',
  hero_image TEXT DEFAULT '',
  images TEXT DEFAULT '[]',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  location TEXT DEFAULT '',
  prefecture TEXT DEFAULT '',
  area TEXT DEFAULT '',
  category TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  admission TEXT DEFAULT '',
  best_for TEXT DEFAULT '',
  good_for TEXT DEFAULT '',
  nearest_station TEXT DEFAULT '',
  official_site TEXT DEFAULT '',
  why_people_love_it TEXT DEFAULT '',
  tips_for_visitors TEXT DEFAULT '[]',
  highlight_title TEXT DEFAULT ''
);

-- Guides
CREATE TABLE IF NOT EXISTS guides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  category TEXT DEFAULT '',
  category_slug TEXT DEFAULT '',
  image TEXT DEFAULT '',
  author TEXT DEFAULT '',
  date TEXT DEFAULT '',
  read_time TEXT DEFAULT '',
  featured INTEGER DEFAULT 0,
  table_of_contents TEXT DEFAULT '[]'
);

-- Destinations
CREATE TABLE IF NOT EXISTS destinations (
  name TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE
);

-- Guide categories
CREATE TABLE IF NOT EXISTS guide_categories (
  name TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '',
  count INTEGER DEFAULT 0
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TEXT DEFAULT '',
  last_login TEXT DEFAULT '',
  active INTEGER DEFAULT 1
);

-- Roles
CREATE TABLE IF NOT EXISTS roles (
  role TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  permissions TEXT NOT NULL DEFAULT '[]'
);

-- Popular tags
CREATE TABLE IF NOT EXISTS popular_tags (
  tag TEXT PRIMARY KEY
);

-- Seed destinations
INSERT OR IGNORE INTO destinations (name, slug) VALUES
  ('Tokyo', 'tokyo'),
  ('Asakusa', 'asakusa'),
  ('Kyoto', 'kyoto'),
  ('Osaka', 'osaka'),
  ('Kanazawa', 'kanazawa'),
  ('Mount Fuji', 'mount-fuji');

-- Seed guide categories
INSERT OR IGNORE INTO guide_categories (name, slug, icon, count) VALUES
  ('Food & Restaurants', 'food-restaurants', '📘', 0),
  ('Hidden Gems', 'hidden-gems', '📍', 0),
  ('Japanese Culture', 'japanese-culture', '🪭', 0),
  ('Things to Do in Japan', 'things-to-do-in-japan', '📘', 0),
  ('Tokyo Travel Guide', 'tokyo-travel-guide', '📘', 0),
  ('Travel Planning', 'travel-planning', '🧳', 2),
  ('Travel Tips', 'travel-tips', '💡', 0),
  ('Unique Experiences', 'unique-experiences', '📘', 0);

-- Seed popular tags
INSERT OR IGNORE INTO popular_tags (tag) VALUES
  ('Ajisai'),
  ('Bunkyo City'),
  ('culture'),
  ('festival'),
  ('Flower Festival Tokyo'),
  ('Hakusan Shrine'),
  ('Horikiri Iris Garden'),
  ('Hydrangea Festival'),
  ('Iris Festival'),
  ('June Events Tokyo');

-- Seed roles
INSERT OR IGNORE INTO roles (role, label, permissions) VALUES
  ('super_admin', 'Super Admin', '["experiences:read","experiences:write","experiences:delete","events:read","events:write","events:delete","guides:read","guides:write","guides:delete","destinations:read","destinations:write","categories:read","categories:write","users:read","users:write","users:delete"]'),
  ('editor', 'Editor', '["experiences:read","experiences:write","experiences:delete","events:read","events:write","events:delete","guides:read","guides:write","guides:delete","destinations:read","destinations:write","categories:read","categories:write"]'),
  ('support', 'Support', '["experiences:read","events:read","guides:read","destinations:read","categories:read"]');

-- Seed experiences
INSERT OR IGNORE INTO experiences (id, title, slug, short_description, description, duration, group_size, language, experience_type, location, destination, category, price, currency, image, images, featured, popular, rating, review_count, meeting_point, cancellation_policy, highlights, included, not_included, itinerary, host_name, host_instagram, booking_note) VALUES
('1', 'Private Craft Your Own Ring Handmade Experience', 'private-craft-your-own-ring-handmade-experience', 'Experience making a handmade ring by hammering the texture using the Japanese traditional style called ''Tankin.''', 'Experience making a handmade ring by hammering the texture using the Japanese traditional style called ''Tankin.'' You will choose your favorite material, thickness, and texture, and then use special hammers and tools to customize your own ring. The entire process takes around 1 hour. Staff will carefully explain the steps and help you take remembrance photos.', '1h 30m', 'Up to 4', 'Japanese, English', 'Authentic', 'Asakusa, Tokyo', 'Asakusa', 'Popular', 3300, '¥', 'https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-1-600x450.jpg', '["https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-1.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-2.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-3.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-4.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-5.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-6.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-7.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-8.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-9.jpg","https://yonihon.com/wp-content/uploads/2026/06/ring-made-asakusa-10.jpg"]', 1, 1, 4.8, 12, 'Nane tokyo Asakusa 浅草店, Japan, 111-0032 Tokyo, Taito City, Asakusa, 1-chōme−31−８ 1F', 'Reservations made through YONIHON are free of charge, and no payment is required at the time of booking.', '["Make your own ring using traditional Japanese techniques","Choose your favorite material, thickness, and texture","Take home your handmade ring the same day","English-speaking staff available"]', '["Workshop price","Guide: English or Japanese"]', '["Ring engraving options"]', '[{"title":"Craft Your Own Ring Workshop","description":"In this workshop, you can craft your own ring using a hammer to create unique textures."}]', 'Nane Asakusa', 'nane.asakusa', 'Prices listed are minimum starting prices.');

-- Seed events
INSERT OR IGNORE INTO events (id, title, slug, excerpt, description, hero_image, images, start_date, end_date, location, prefecture, area, category, tags, admission, best_for, good_for, nearest_station, official_site, why_people_love_it, tips_for_visitors, highlight_title) VALUES
('1', 'Tokyo Hydrangea Season｜紫陽花祭り (Ajisai Matsuri)', 'tokyo-hydrangea-season-ajisai-matsuri', 'Experience Tokyo''s beautiful hydrangea season as thousands of colorful blooms transform temples, shrines, and gardens across the city.', 'June marks the arrival of hydrangea season in Tokyo, bringing vibrant shades of blue, purple, pink, and white to parks, shrines, temples, and gardens throughout the city.', 'https://yonihon.com/wp-content/uploads/2026/06/yamasa-n-pT1ezChewSU-unsplash-600x450.jpg', '["https://yonihon.com/wp-content/uploads/2026/06/diana-bondarenko-jjzRC4axcqI-unsplash-600x450.jpg","https://yonihon.com/wp-content/uploads/2026/06/pexels-arlindphotography-33181597-600x450.jpg","https://yonihon.com/wp-content/uploads/2026/06/pexels-francesco-ungaro-4762143-600x450.jpg"]', 'June 6', 'June 14, 2026', 'Bunkyo, Tokyo', 'Tokyo', 'Bunkyo', 'Flowers', '["Ajisai","Bunkyo City","Flower Festival Tokyo","Hakusan Shrine","Hydrangea Festival","June Events Tokyo"]', 'Free', 'Photographers, Couples, Nature Lovers, Families, Solo Travelers', 'English, Families', 'Hakusan Station (Toei Mita Line)', 'https://hakusanshita.com/bunkyo-ajisaifes_no42/index_en.html', 'Hydrangea season brings a burst of color to Tokyo during the rainy season.', '["Bring an umbrella as June is part of Japan''s rainy season.","Visit early in the morning for the best photography conditions.","Wear comfortable walking shoes.","Consider visiting after light rain for the most vibrant flower colors.","Respect shrine etiquette while exploring the grounds."]', 'Experience Tokyo''s beautiful hydrangea season'),

('2', 'Katsushika Iris Festival 2026 Tokyo', 'katsushika-iris-festival-2026-tokyo-best-iris-flower-festival-in-japan-yonihon', 'Celebrate the beauty of early summer at the Katsushika Iris Festival, one of Tokyo''s most beautiful flower events.', 'Celebrate the beauty of early summer at the Katsushika Iris Festival, one of Tokyo''s most beautiful flower events.', 'https://yonihon.com/wp-content/uploads/2026/06/pexels-pixabay-69088-600x450.jpg', '[]', 'May/Jun 25', '14, 2026', 'Katsushika, Tokyo', 'Tokyo', 'Katsushika', 'Flowers', '["Iris Festival","Flower Festival Tokyo","June Events Tokyo"]', 'Free', 'Nature Lovers, Families, Photographers', 'English, Families', 'Horikiri Shobuen Station', '', 'The Iris Festival is a spectacular display of color and tradition.', '["Visit on a weekday for fewer crowds.","Bring water and sun protection."]', ''),

('3', 'Torigoe Matsuri', 'torigoe-matsuri', 'Famous for carrying one of Tokyo''s heaviest mikoshi (portable shrines) through the streets.', 'Famous for carrying one of Tokyo''s heaviest mikoshi (portable shrines) through the streets.', 'https://yonihon.com/wp-content/uploads/2026/06/pexels-railgunbreaker-33139894-600x450.jpg', '[]', 'June 6', 'June 9, 2026', 'Asakusabashi / Kuramae, Tokyo', 'Tokyo', 'Asakusabashi', 'Cultural Events', '["festival","culture","Tokyo"]', 'Free', 'Culture Lovers, Photographers, Families', 'English, Families', 'Asakusabashi Station', '', 'The intense energy of carrying the massive mikoshi through narrow streets is an unforgettable sight.', '["Arrive early for a good viewing spot.","Follow the crowd and street instructions."]', ''),

('4', 'Sanno Matsuri', 'sanno-matsuri', 'One of Tokyo''s three great Shinto festivals, featuring traditional processions, shrine ceremonies, and cultural performances.', 'One of Tokyo''s three great Shinto festivals, featuring traditional processions, shrine ceremonies, and cultural performances.', 'https://yonihon.com/wp-content/uploads/2026/06/sanno-matsuru-600x450.jpg', '[]', 'June 7', 'June 17, 2026', 'Akasaka, Tokyo', 'Tokyo', 'Akasaka', 'Cultural Events', '["festival","culture","Shinto","Tokyo"]', 'Free', 'Culture Lovers, History Buffs, Families', 'English, Families', 'Akasaka Station', '', 'As one of Tokyo''s three great festivals, Sanno Matsuri offers a deep dive into Shinto traditions.', '["Check the parade schedule in advance.","Bring comfortable shoes for following the procession."]', '');

-- Seed guides
INSERT OR IGNORE INTO guides (id, title, slug, excerpt, content, category, category_slug, image, author, date, read_time, featured, table_of_contents) VALUES
('1', '15 Things to Know Before Visiting Japan', '15-things-to-know-before-visiting-japan', 'Practical Japan travel tips that can save you time, money and unnecessary stress', '**Practical Japan travel tips that can save you time, money and unnecessary stress**\n\nPlanning your first trip to Japan can feel overwhelming.', 'Travel Planning', 'travel-planning', 'https://yonihon.com/wp-content/uploads/2026/06/ChatGPT-Image-Jun-24-2026-03_16_48-AM-900x600.png', 'Yonihon', 'June 23, 2026', '10 min read', 1, '[{"title":"Carry Cash","anchor":"1-carry-some-cash-even-though-japan-is-becoming-more-cashless"},{"title":"Use IC Card","anchor":"2-use-an-ic-card-for-easier-transport"},{"title":"JR Pass Value","anchor":"3-calculate-whether-the-jr-pass-is-worth-it"},{"title":"Internet Access","anchor":"4-arrange-internet-access-before-arrival"}]'),

('2', 'Things to Know Before Visiting Japan', 'things-to-know-before-visiting-japan', 'Things to Know Before Visiting Japan — Japan is one of the most rewarding countries to visit…', 'Japan is one of the most rewarding countries to visit. From ancient temples to neon-lit streets, the country offers a unique blend of tradition and modernity.', 'Travel Planning', 'travel-planning', 'https://yonihon.com/wp-content/uploads/2026/06/djedj-japanese-lantern-5568727-900x600.jpg', 'Yonihon', 'June 1, 2026', '10 min read', 1, '[]'),

('3', 'First-Time Visitor''s Guide to Japan: Everything You Need to Know', 'first-time-visitors-guide-to-japan-everything-you-need-to-know', 'From ancient temples to neon-lit streets, Japan offers an unforgettable experience for first-time visitors.', 'From ancient temples to neon-lit streets, Japan offers an unforgettable experience for first-time visitors.', 'Travel Planning', 'travel-planning', 'https://yonihon.com/wp-content/uploads/2026/06/japan-900x600.jpg', 'Yonihon', 'June 1, 2026', '7 min read', 1, '[]');

-- Seed users (passwords are SHA-256 hashed with salt "yonihon-salt")
-- admin123 → a15600a8539674ace89d59c5b80c5d4f63cd4be1979703b5579c59269c918fa2
-- editor123 → 96c1a2ba401c029a2b9ab86d008aa071dbb091879aa196de37632b592fb2c856
-- support123 → 8e42c933b71cc647d87969094b5c93e9bf8e37819a84039b1c9c440545d59e37
INSERT OR IGNORE INTO users (id, name, email, password, role, created_at, active) VALUES
  ('1', 'Admin', 'admin@yonihon.com', 'a15600a8539674ace89d59c5b80c5d4f63cd4be1979703b5579c59269c918fa2', 'super_admin', '2026-01-01', 1),
  ('2', 'Editor', 'editor@yonihon.com', '96c1a2ba401c029a2b9ab86d008aa071dbb091879aa196de37632b592fb2c856', 'editor', '2026-01-01', 1),
  ('3', 'Support', 'support@yonihon.com', '8e42c933b71cc647d87969094b5c93e9bf8e37819a84039b1c9c440545d59e37', 'support', '2026-01-01', 1);
