-- Run this SQL in your Supabase SQL Editor
-- Go to: Supabase Dashboard > SQL Editor > New Query

-- 1. PHONES TABLE
CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    stock INTEGER DEFAULT 0,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. PRE-OWNED TABLE
CREATE TABLE pre_owned (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    battery TEXT,
    condition TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. OFFERS TABLE
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    discount TEXT NOT NULL,
    category TEXT,
    valid_till DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. SERVICES TABLE
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    time TEXT,
    category TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_owned ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for simplicity)
CREATE POLICY "Allow all on phones" ON phones FOR ALL USING (true);
CREATE POLICY "Allow all on pre_owned" ON pre_owned FOR ALL USING (true);
CREATE POLICY "Allow all on offers" ON offers FOR ALL USING (true);
CREATE POLICY "Allow all on services" ON services FOR ALL USING (true);

-- Insert sample data for phones
INSERT INTO phones (name, brand, price, original_price, stock, image) VALUES
('iPhone 16 Pro Max', 'Apple', 144900, 159900, 5, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('iPhone 16 Pro', 'Apple', 119900, 134900, 8, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('Samsung S24 Ultra', 'Samsung', 129999, 149999, 3, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'),
('OnePlus 12', 'OnePlus', 64999, 69999, 10, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600');

-- Insert sample data for pre_owned
INSERT INTO pre_owned (name, brand, price, original_price, battery, condition, image) VALUES
('iPhone 15 Pro', 'Apple', 84900, 134900, '98%', 'Like New', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'),
('Samsung S23 Ultra', 'Samsung', 74900, 124900, '95%', 'Excellent', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'),
('iPhone 14 Plus', 'Apple', 52900, 89900, '92%', 'Pristine', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600');

-- Insert sample data for offers
INSERT INTO offers (title, discount, category, valid_till, active) VALUES
('iPhone 16 Launch Offer', '₹15,000 OFF', 'Featured', '2024-12-31', true),
('Exchange Bonus', 'Up to ₹20,000', 'Exchange', '2024-12-31', true),
('HDFC Card Offer', '10% Cashback', 'Bank Offers', '2024-12-31', true);

-- Insert sample data for services
INSERT INTO services (name, price, time, category, active) VALUES
('Screen Replacement', 'From ₹2,999', '2-3 hours', 'Repair', true),
('Battery Replacement', 'From ₹1,499', '1 hour', 'Repair', true),
('Software Update', '₹499', '30 min', 'Software', true);
