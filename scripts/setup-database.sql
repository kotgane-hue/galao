-- =============================================
-- Galagon Travel: Supabase Database Setup (v2)
-- Удаляет старые таблицы и создаёт заново
-- =============================================

-- Удалить старые таблицы (если были)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS tours CASCADE;

-- 1. Таблица туров
CREATE TABLE tours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '3 500 ₽',
  duration TEXT NOT NULL DEFAULT '1 день',
  difficulty TEXT NOT NULL DEFAULT 'Легкий',
  distance TEXT DEFAULT '10-20 km',
  location TEXT DEFAULT 'Осетия',
  image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  short_desc TEXT,
  description TEXT NOT NULL DEFAULT '',
  program JSONB DEFAULT '[]'::jsonb,
  gear TEXT DEFAULT '',
  color TEXT DEFAULT 'emerald',
  category TEXT NOT NULL DEFAULT 'one-day',
  reviews JSONB DEFAULT '[]'::jsonb,
  dates JSONB DEFAULT '[]'::jsonb,
  group_size_info TEXT,
  details JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Таблица команды
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  instagram TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Таблица отзывов
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  avatar TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Публичное чтение (любой пользователь может читать)
CREATE POLICY "tours_public_read" ON tours FOR SELECT USING (true);
CREATE POLICY "team_public_read" ON team_members FOR SELECT USING (true);
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);

-- Запись только для авторизованных (админ)
CREATE POLICY "tours_admin_insert" ON tours FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "tours_admin_update" ON tours FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "tours_admin_delete" ON tours FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "team_admin_insert" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "team_admin_update" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "team_admin_delete" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "reviews_admin_insert" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "reviews_admin_update" ON reviews FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "reviews_admin_delete" ON reviews FOR DELETE USING (auth.role() = 'authenticated');
