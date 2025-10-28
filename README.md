# PayApp - Complete version (Sanctum cookie-based SPA auth)

This repository contains a complete starter skeleton for the project:
- Laravel 12 backend (scaffolded during first container run)
- React + Vite frontend
- Docker Compose to run Postgres, backend, and frontend
- Secure SPA auth using Laravel Sanctum cookie/session flow
- Two-factor authentication (TOTP) using pragmarx/google2fa-laravel and QR generation

## What to expect
- On first run Docker will scaffold Laravel inside the backend container and install composer packages.
- This may take several minutes (Composer downloads).
- After setup, frontend will run at http://localhost:3000 and backend at http://localhost:8000.

## Step-by-step instructions (exact commands)

1. Download the ZIP and extract, or clone the repo into a folder, e.g. `payapp-complete`.

2. In repo root, run:
   ```bash
   docker compose up --build
   ```
   The backend container will run `setup.sh` which:
   - scaffolds Laravel 12 (if not already present)
   - installs packages (sanctum, google2fa, bacon-qr-code)
   - publishes vendor configs
   - copies template controllers, migrations, and configs into the Laravel app
   - generates APP_KEY and runs `php artisan migrate`

3. Wait until `backend` reports "Backend setup finished." and Laravel migrations completed.
   Then open the frontend: http://localhost:3000

4. Test the app:
   - Register a new user (Register page).
   - Login (the frontend calls `/sanctum/csrf-cookie` automatically before login).
   - If you enable 2FA (Dashboard → 2FA Setup), scan the QR with Google Authenticator or Authy and verify code.
   - Logout then login again to see the 2FA login flow (you'll be prompted to enter a code).

## Troubleshooting

- If ports 3000/8000/5432 are in use, stop the conflicting services or change ports in `docker-compose.yml`.
- If backend `php artisan migrate` fails, exec into the backend container for debugging:
  ```bash
  docker compose exec backend sh
  php artisan migrate
  ```
- If you experience permission issues on Linux with mounted volumes, try `sudo chown -R $UID:$GID backend` or adjust Docker settings.

## Security recommendations for production

- Use HTTPS and set proper `SESSION_DOMAIN` and `SANCTUM_STATEFUL_DOMAINS`.
- Use strong database credentials and Docker secrets for production.
- Configure CORS to only allow your frontend origin.
- Store `two_factor_secret` encrypted (this template already encrypts the secret).
- Use environment variables and never commit `.env`.

## Next steps I can help with
- Add Email verification and password reset flows.
- Add unit/integration tests (PHPUnit + Vitest).
- Prepare a production-ready Docker/NGINX stack with HTTPS.

Enjoy! If you want, I can now:
- Build the final ZIP for you to download (I already generated it).
- Or push the repo to your GitHub if you provide a repo URL or authorize.
