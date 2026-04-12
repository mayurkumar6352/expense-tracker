# 💸 Ledgr — Expense Tracker PWA

A production-grade Progressive Web App for tracking income and expenses. Built with React + Vite + Tailwind CSS.

---

## 🗂 Project Structure

```
expense-tracker/
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker (offline support)
│   └── icons/               # App icons (72–512px)
├── src/
│   ├── components/
│   │   ├── App.jsx          # Root component + routing
│   │   ├── Dashboard.jsx    # Balance overview
│   │   ├── AddTransaction.jsx  # Add transaction form
│   │   ├── TransactionList.jsx # History + search + delete
│   │   ├── BottomNav.jsx    # Mobile bottom navigation
│   │   └── Banners.jsx      # Install & offline banners
│   ├── hooks/
│   │   ├── useTransactions.js  # CRUD + localStorage
│   │   └── usePWA.js           # Install prompt + online status
│   ├── utils/
│   │   └── format.js        # Currency, date, category utils
│   ├── index.css            # Tailwind + global styles
│   └── main.jsx             # Entry point + SW registration
├── index.html               # HTML shell with PWA meta tags
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for production
```bash
npm run build
npm run preview
```

---

## 📱 Installing on Android Phone

### Method A — Via Chrome (Recommended)
1. Build the project: `npm run build && npm run preview`
2. Open the preview URL in Chrome on your Android device
3. Tap the **three-dot menu (⋮)** in Chrome
4. Select **"Add to Home screen"** or **"Install app"**
5. Tap **Install** — Ledgr will appear as an app icon!

### Method B — QR Code / Local Network
1. Find your computer's local IP: `ipconfig` (Windows) / `ifconfig` (Mac/Linux)
2. Run: `npm run preview -- --host 0.0.0.0`
3. Open `http://YOUR_IP:4173` on your Android phone
4. Add to Home Screen via Chrome menu

### Method C — Deploy to Vercel/Netlify (Best for real use)
```bash
npm install -g vercel
npm run build
vercel dist
```
Then open the Vercel URL on any phone and install from browser.

---

## ✨ Features

| Feature | Details |
|---|---|
| 💰 Balance Overview | Real-time Income − Expenses |
| ➕ Add Transactions | Title, amount, type, category, date |
| 🗂 Transaction History | Grouped by date, search, filter |
| 🗑️ Delete | Tap-to-confirm delete |
| 📦 Categories | 13 categories with emoji icons |
| 💾 Persistence | LocalStorage — survives refresh |
| 📴 Offline Support | Service Worker caches the app |
| 📲 Installable | PWA manifest + install prompt |
| 🌐 Online/Offline indicator | Real-time status banner |

---

## 🎨 Design System

- **Font**: Syne (display) + DM Sans (body) + DM Mono (numbers)
- **Theme**: Deep dark fintech — `#0A0A0F` background, `#7C6FFF` accent
- **Income**: `#22D3A0` (teal green)
- **Expense**: `#FF6B6B` (coral red)
- **Animations**: Slide-up, scale-in, fade-in — 60fps CSS transitions

---

## 🔧 Tech Stack

- **React 18** + **Vite 5** — fast dev & build
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — icon library
- **LocalStorage** — zero-backend persistence
- **Service Worker** — offline-first PWA
- **Web App Manifest** — installable on Android/iOS
