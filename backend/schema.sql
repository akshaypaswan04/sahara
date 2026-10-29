-- Sahara Database Schema (PostgreSQL / Supabase)
-- Prototype reference schema

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  preferred_language VARCHAR(10) DEFAULT 'en',
  location_state VARCHAR(100),
  location_district VARCHAR(100),
  accessibility_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Alerts (from authorized sources)
CREATE TABLE IF NOT EXISTS alerts (
  id VARCHAR(50) PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  source_authority VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- flood, rainfall, cyclone, heat, earthquake, drought, other
  severity VARCHAR(20) NOT NULL, -- critical, high, medium, low
  location VARCHAR(255) NOT NULL,
  district VARCHAR(100),
  state VARCHAR(100),
  coordinates_lat DECIMAL(9,6),
  coordinates_lng DECIMAL(9,6),
  affected_radius_km INTEGER,
  original_message TEXT NOT NULL,
  action_points JSONB DEFAULT '[]',
  issued_at TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  is_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Alert Translations (multilingual AI output)
CREATE TABLE IF NOT EXISTS alert_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id VARCHAR(50) REFERENCES alerts(id),
  language VARCHAR(10) NOT NULL,
  translated_message TEXT,
  simplified_message TEXT,
  action_points JSONB DEFAULT '[]',
  generated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(alert_id, language)
);

-- Shelters (linked to alerts)
CREATE TABLE IF NOT EXISTS shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id VARCHAR(50) REFERENCES alerts(id),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  coordinates_lat DECIMAL(9,6),
  coordinates_lng DECIMAL(9,6),
  capacity INTEGER,
  contact VARCHAR(100),
  is_demo BOOLEAN DEFAULT FALSE
);

-- Forms (official government forms)
CREATE TABLE IF NOT EXISTS forms (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  source VARCHAR(255),
  source_authority VARCHAR(255),
  description TEXT,
  purpose TEXT,
  is_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Form Fields
CREATE TABLE IF NOT EXISTS form_fields (
  id VARCHAR(50) PRIMARY KEY,
  form_id VARCHAR(50) REFERENCES forms(id),
  name VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- text, date, select, textarea, file, number
  required BOOLEAN DEFAULT FALSE,
  placeholder VARCHAR(255),
  options JSONB, -- for select fields
  example_value VARCHAR(255),
  sort_order INTEGER DEFAULT 0
);

-- Form Field Explanations (multilingual)
CREATE TABLE IF NOT EXISTS form_field_explanations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id VARCHAR(50) REFERENCES form_fields(id),
  language VARCHAR(10) NOT NULL,
  explanation TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(field_id, language)
);

-- Required Documents
CREATE TABLE IF NOT EXISTS required_documents (
  id VARCHAR(50) PRIMARY KEY,
  form_id VARCHAR(50) REFERENCES forms(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  mandatory BOOLEAN DEFAULT TRUE
);

-- Applications (user form submissions)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  form_id VARCHAR(50) REFERENCES forms(id),
  status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, under_review, approved, rejected
  field_values JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Documents (uploaded by users)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id),
  required_document_id VARCHAR(50) REFERENCES required_documents(id),
  file_name VARCHAR(255),
  file_url TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100), -- alert_viewed, alert_translated, form_started, form_submitted, tts_played, voice_used
  user_id UUID REFERENCES users(id),
  language VARCHAR(10),
  reference_id VARCHAR(100), -- alert_id or form_id
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
