-- Correct the owner's name spelling ("Barath" -> "Bharath"), set the real
-- official support email now that one has been provided, and move the admin
-- login credential from the old placeholder domain to the real one.
ALTER TABLE "site_settings" ALTER COLUMN "owner" SET DEFAULT 'Mr. Bharath';
ALTER TABLE "site_settings" ALTER COLUMN "email" SET DEFAULT 'support@uranusenterprises.in';

UPDATE "site_settings"
SET "owner" = 'Mr. Bharath'
WHERE "owner" = 'Mr. Barath';

UPDATE "site_settings"
SET "email" = 'support@uranusenterprises.in'
WHERE "email" = '';

UPDATE "admin_users"
SET "name" = 'Mr. Bharath',
    "email" = 'admin@uranusenterprises.in'
WHERE "email" = 'admin@uranus.in';
