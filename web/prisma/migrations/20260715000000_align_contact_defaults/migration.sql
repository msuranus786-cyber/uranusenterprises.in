-- Align the site_settings contact defaults with the real business number
-- (schema previously defaulted to a dummy +91 98765 43210).
ALTER TABLE "site_settings" ALTER COLUMN "phoneDisplay" SET DEFAULT '+91 98417 70013';
ALTER TABLE "site_settings" ALTER COLUMN "whatsappNumber" SET DEFAULT '919841770013';

-- Repair any existing row that captured the old dummy defaults.
UPDATE "site_settings"
SET "phoneDisplay" = '+91 98417 70013'
WHERE "phoneDisplay" = '+91 98765 43210';

UPDATE "site_settings"
SET "whatsappNumber" = '919841770013'
WHERE "whatsappNumber" = '919876543210';
