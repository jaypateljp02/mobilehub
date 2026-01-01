-- Mobile Hub Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Phones Table (New phones)
CREATE TABLE phones (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    stock INTEGER DEFAULT 10,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pre-Owned Phones Table
CREATE TABLE pre_owned (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    battery TEXT DEFAULT '90%',
    condition TEXT DEFAULT 'Good',
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offers Table
CREATE TABLE offers (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    discount TEXT NOT NULL,
    category TEXT DEFAULT 'Featured',
    valid_till DATE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    time TEXT,
    category TEXT DEFAULT 'Repair',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - Allow public read access
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_owned ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read" ON phones FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON pre_owned FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON offers FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);

-- Policies for authenticated insert/update/delete (for admin)
CREATE POLICY "Allow all for anon" ON phones FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON pre_owned FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON offers FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON services FOR ALL USING (true);

-- Insert sample data
INSERT INTO phones (name, brand, price, original_price, stock, image) VALUES
('iPhone 16 Pro Max', 'Apple', 144900, 159900, 5, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('iPhone 16 Pro', 'Apple', 119900, 134900, 8, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('Samsung S24 Ultra', 'Samsung', 129999, 149999, 3, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'),
('OnePlus 12', 'OnePlus', 64999, 69999, 10, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600');

INSERT INTO pre_owned (name, brand, price, original_price, battery, condition, image) VALUES
('iPhone 15 Pro', 'Apple', 84900, 134900, '98%', 'Like New', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('Samsung S23 Ultra', 'Samsung', 74900, 124900, '95%', 'Excellent', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'),
('iPhone 14 Plus', 'Apple', 52900, 89900, '92%', 'Pristine', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600');

INSERT INTO offers (title, discount, category, valid_till, active) VALUES
('iPhone 16 Launch Offer', '₹15,000 OFF', 'Featured', '2024-03-31', true),
('Exchange Bonus', 'Up to ₹20,000', 'Exchange', '2024-03-15', true),
('HDFC Card Offer', '10% Cashback', 'Bank Offers', '2024-02-28', true);

INSERT INTO services (name, price, time, category) VALUES
('Screen Replacement', 'From ₹2,999', '2-3 hours', 'Repair'),
('Battery Replacement', 'From ₹1,499', '1 hour', 'Repair'),
('Water Damage Repair', 'From ₹1,999', '24-48 hours', 'Repair'),
('Software Update', '₹499', '30 min', 'Software');

-- Accessories Table
CREATE TABLE accessories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE accessories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON accessories FOR SELECT USING (true);
CREATE POLICY "Allow all for anon" ON accessories FOR ALL USING (true);

INSERT INTO accessories (name, brand, category, price, original_price, image) VALUES
('Apple AirPods Pro 2', 'Apple', 'Earbuds', 24900, 26900, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400'),
('Samsung Galaxy Buds3 Pro', 'Samsung', 'Earbuds', 17999, 19999, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'),
('Apple Watch Series 9', 'Apple', 'Smartwatch', 41900, 44900, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'),
('Samsung Galaxy Watch 6', 'Samsung', 'Smartwatch', 28999, 32999, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400'),
('iPhone 16 Pro Silicone Case', 'Apple', 'Cases', 4900, 4900, 'https://images.unsplash.com/photo-1603351154351-5cf99bc32f1d?w=400'),
('Apple 20W USB-C Charger', 'Apple', 'Chargers', 1900, 1900, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400');
