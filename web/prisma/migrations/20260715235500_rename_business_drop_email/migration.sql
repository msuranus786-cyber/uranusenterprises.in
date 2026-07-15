-- Correct the business name to "Uranus Enterprises" (plural), drop the
-- "Ms.Uranus Nanofix" sub-brand, and clear the placeholder support email
-- until a real one is provided.
ALTER TABLE "site_settings" ALTER COLUMN "name" SET DEFAULT 'Uranus Enterprises';
ALTER TABLE "site_settings" ALTER COLUMN "brand" SET DEFAULT 'Uranus Enterprises';
ALTER TABLE "site_settings" ALTER COLUMN "email" SET DEFAULT '';

UPDATE "site_settings"
SET "name" = 'Uranus Enterprises'
WHERE "name" = 'Uranus Enterprise';

UPDATE "site_settings"
SET "brand" = 'Uranus Enterprises'
WHERE "brand" = 'Ms.Uranus Nanofix';

UPDATE "site_settings"
SET "email" = ''
WHERE "email" = 'support@shan.enterprises';
