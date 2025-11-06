# 🧾 Inventory Manager

An **Inventory Management System** built with **Laravel**, **Inertia.js**, and **React**.  
It helps users manage suppliers, products, categories, and stock levels — all in one sleek and modern dashboard.

---

## 🚀 Features

- 🔐 Authentication with Laravel Breeze / Sanctum  
- 📦 Manage Products, Categories, and Suppliers  
- 📊 Dashboard with statistics and charts  
- ⚙️ Backend: Laravel 11 + MySQL  
- 🎨 Frontend: React + Inertia.js + TailwindCSS  
- 🐳 Docker support for easy setup  

---

## 🛠️ Requirements

Ensure the following are installed on your system:

- PHP ≥ 8.2  
- Composer ≥ 2.x  
- Node.js ≥ 18 (Recommended ≥ 20.19)  
- NPM or Yarn  
- MySQL or Docker  

---

## ⚙️ Local Setup (Without Docker)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/inventory-manager.git
cd inventory-manager
```

### 2️⃣ Install PHP Dependencies
```bash
composer install
```

### 3️⃣ Install Node Dependencies
```bash
npm install
```

### 4️⃣ Create Environment File
```bash
cp .env.example .env
```

### 5️⃣ Generate Application Key
```bash
php artisan key:generate
```

### 6️⃣ Configure Database
Edit your `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventory
DB_USERNAME=root
DB_PASSWORD=root
```

### 7️⃣ Run Database Migrations and Seeders
```bash
php artisan migrate --seed
```

### 8️⃣ Run Development Servers
Run Laravel backend:
```bash
php artisan serve
```

Then, in a separate terminal, run React/Vite frontend:
```bash
npm run dev
```

✅ Visit: [http://localhost:8000](http://localhost:8000)

---

## 🐳 Run with Docker (Optional)

If you prefer using Docker for an isolated environment:

### 1️⃣ Build and Start Containers
```bash
docker-compose up --build -d
```

### 2️⃣ Access the App Container
```bash
docker exec -it laravel_app bash
```

### 3️⃣ Inside the Container, Install Dependencies
```bash
composer install
npm install
npm run build
php artisan migrate --seed
php artisan key:generate
exit
```

✅ Visit your app at: [http://localhost:8080](http://localhost:8080)

---

## 🧩 Common Commands

| Command | Description |
|----------|-------------|
| `composer install` | Install PHP dependencies |
| `npm install` | Install frontend dependencies |
| `npm run dev` | Run React + Vite in dev mode |
| `npm run build` | Build production-ready assets |
| `php artisan serve` | Start Laravel backend server |
| `php artisan migrate --seed` | Run database migrations with seed data |
| `php artisan optimize:clear` | Clear Laravel cache and config |
| `docker-compose up -d` | Start Docker containers |
| `docker-compose down` | Stop all running containers |

---

## 📁 Project Structure

```
inventory-manager/
├── app/                     # Laravel backend logic
├── database/                # Migrations & seeders
├── public/                  # Public assets
├── resources/js/            # React (Inertia) frontend
├── routes/                  # Web routes
├── docker-compose.yml       # Docker config
├── Dockerfile               # App container setup
├── package.json             # JS dependencies
├── composer.json            # PHP dependencies
└── README.md
```

---

## 🧑‍💻 Quick Start Commands Summary

```bash
# Clone repo
git clone https://github.com/yourusername/inventory-manager.git
cd inventory-manager

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure database (edit .env file)
php artisan migrate --seed

# Run development servers
php artisan serve
npm run dev
```

---

## 🐞 Troubleshooting

### ❌ Vite Connection Refused
If you see errors like:
```
GET http://[::1]:5173/... net::ERR_CONNECTION_REFUSED
```
➡ It means Vite isn’t running. Run:
```bash
npm run dev
```

### ❌ MySQL Connection Fails (in Docker)
Update `.env`:
```env
DB_HOST=db
```

### ❌ Node Version Warning
If you see:
```
Vite requires Node.js version 20.19+ or 22.12+
```
➡ Update Node.js using:
```bash
nvm install 20.19
nvm use 20.19
```

---

## 🧑‍🤝‍🧑 Contributors

- **Reham Hatem** — Full Stack Developer  

Open to contributions — feel free to submit a PR or raise an issue.

---


## 💡 Summary

**Inventory Manager** is a full-stack Laravel + React + Inertia.js application for efficiently managing inventory, suppliers, and stock in real-time.  
Built for performance, scalability, and ease of development. 🚀
