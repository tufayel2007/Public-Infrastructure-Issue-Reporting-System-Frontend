# Public Infrastructure Issue Reporting System

This system is a digital platform where citizens can report public issues such as broken streetlights, potholes, water leakage, garbage overflow, and damaged sidewalks.  
Admins and government staff can quickly manage, verify, assign, and resolve citizen reports.

---

## 🌐 Live Website

**Live Site URL:** [https://your-live-site.com](https://your-live-site.com)

---

## 👤 Admin Credentials

- **Email:** admin@example.com
- **Password:** Admin@123

---

## ⚡ Main Features (10+)

1. Citizens can report issues with images and location
2. Issue status tracking: Pending → In-Progress → Resolved → Closed
3. Free & Premium user limits and subscriptions
4. Upvote feature: a user can upvote an issue only once
5. Boosted Issue: Increase priority via payment
6. Search, filter, and pagination (server-side)
7. Dashboards: Citizen, Staff, and Admin with stats & charts
8. Issue Timeline: Full history of each issue
9. Profile Page & User Management
10. Payments & Invoice PDF download
11. Responsive Design: Mobile, Tablet, Desktop
12. SweetAlert/Toast notifications for all CRUD operations

---

## 🖥️ System Requirements

- Node.js v18+
- MongoDB (Atlas or Local)
- Firebase (Authentication & Storage)
- Vite + React + TailwindCSS
- TanStack Query (data fetching)
- SweetAlert2 / React Hot Toast
- Stripe / Payment Gateway (Boost & Subscription)

---

## 📂 Folder Structure (Detailed)

/client
├─ /public # Static files like index.html, favicon
├─ /src
│ ├─ /components # Reusable UI components
│ ├─ /pages # Pages like Home, AllIssues, Profile, Dashboard
│ ├─ /context # React context providers (Auth, Theme, etc.)
│ ├─ /hooks # Custom hooks
│ ├─ /services # API services (axios/fetch)
│ ├─ /utils # Utility functions
│ ├─ /assets # Images, icons, logos
│ └─ App.jsx
/server
├─ /routes # API routes
├─ /controllers # Controllers with business logic
├─ /models # Mongoose models / database schemas
├─ /middlewares # Auth, error handling, validation
├─ /utils # Utility functions (email, PDF generator)
└─ server.js # Main Express server file
.env # Environment variables

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/repo-name.git
# Client
cd client
npm install

# Server
cd server
npm install
MONGO_URI=your_mongo_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
STRIPE_SECRET_KEY=your_stripe_secret_key
 # Client
cd client
npm run dev

# Server
cd server
npm run dev
 📝 How to Use

Visit Home page → See latest resolved issues & features

Sign up / Login as Citizen, Staff, or Admin

Citizens can submit issues, edit pending issues, boost priority

Staff can see assigned issues, update status, resolve

Admin can manage users, staff, payments, and all issues

Track each issue’s timeline & status
🤝 Contributing

Fork the repository

Create your branch (git checkout -b feature-name)

Commit your changes (git commit -m "Update: description")

Push to the branch (git push origin feature-name)

Create a Pull Request

🔒 Environment Variables
MONGO_URI=your_mongo_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
STRIPE_SECRET_KEY=your_stripe_secret_key


Do not hard-code secrets in the source code.

📝 Notes

Refreshing the page while logged in will not break private routes

All data fetching is done using TanStack Query

SweetAlert/Toast notifications are used for CRUD & Payment actions

Fully responsive on mobile, tablet, and desktop

🔗 Useful Links

React Official

Vite Official

TailwindCSS

Firebase

MongoDB
```
