# Public Infrastructure Issue Reporting System

This system is a digital platform where citizens can report public issues such as broken streetlights, potholes, water leakage, garbage overflow, and damaged sidewalks.  
Admins and government staff can quickly manage, verify, assign, and resolve citizen reports.

Premium users get **priority support** and can post issues for **50৳** with direct admin access.

---

## 🌐 Live Website

**Live Site URL:** [https://your-live-site.com](https://your-live-site.com)

---

## 👤 Admin Credentials

| Email               | Password | Notes       |
| ------------------- | -------- | ----------- |
| adminking@gmail.com | 123456   | Full access |

---

## 🧑‍💻 Citizens (Sample Accounts)

Crate a new account 🏃🏼‍➡️🏃🏼‍➡️🏃🏼‍➡️ |

---

## 👥 Staff (Sample Accounts)

| Name        | Email           | Password | Assigned Issues |
| ----------- | --------------- | -------- | --------------- |
| Rasel Ahmed | rasel@staff.com | 778899   | 154+            |
| Hasan       | hasan@staff.com | 667788   | 119+            |

---

## ⚡ Main Features (10+)

1. Citizens can report issues with images and location
2. Issue status tracking: Pending → In-Progress → Resolved → Closed
3. Free & Premium user limits and subscriptions
4. Premium users get **priority support** and can post issues for **50৳**
5. Upvote feature: a user can upvote an issue only once
6. Boosted Issue: Increase priority via payment
7. Search, filter, and pagination (server-side)
8. Dashboards: Citizen, Staff, and Admin with stats & charts
9. Issue Timeline: Full history of each issue
10. Profile Page & User Management
11. Payments & Invoice PDF download
12. Responsive Design: Mobile, Tablet, Desktop
13. SweetAlert/Toast notifications for all CRUD operations
14. Private routes persist after refresh
15. Full audit of actions via Issue Timeline

---

## 🖥️ System Requirements

- Node.js v18+
- MongoDB (Atlas or Local)
- Firebase (Authentication & Storage)
- Vite + React + TailwindCSS
- TanStack Query (data fetching)
- SweetAlert2 / React Hot Toast
- Stripe / Payment Gateway (Boost & Subscription)
- JWT for authentication
- Environment variables for secrets

---

## 📂 Folder Structure (Detailed)

/client  
├─ /public  
├─ /src  
│ ├─ /components  
│ ├─ /pages  
│ ├─ /context  
│ ├─ /hooks  
│ ├─ /services  
│ ├─ /utils  
│ ├─ /assets  
│ └─ App.jsx

/server  
├─ /routes  
├─ /controllers  
├─ /models  
├─ /middlewares  
├─ /utils  
└─ server.js

.env # Environment variables

---

## 📝 How to Use

1. Visit the **Home page** → Explore the latest resolved issues & features.
2. Sign up / cess Portal **Citizen, Staff, or Admin**.
3. **Citizens**:
   - Submit new issues with images & location.
   - Edit pending issues.
   - Boost issue priority via payment (Premium only).
   - Track status and issue timeline.
4. **Staff**:
   - View assigned issues.
   - Update status (Pending → In-Progress → Resolved → Closed).
   - Resolve issues and add timeline entries.
5. **Admin**:
   - Manage all users & staff.
   - Assign or reject issues.
   - Monitor payments and dashboard statistics.
   - Access full issue history and timelines.

---

## 📊 User Roles & Permissions

| Role    | Permissions                                                           | Special Notes                                          |
| ------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| Admin   | Manage users & staff, assign/reject issues, view all payments & stats | Full dashboard access, can see all issues              |
| Citizen | Submit/edit own issues, boost priority, track issue timeline          | Premium users get priority support & 50৳ posting limit |
| Staff   | Update assigned issues, progress tracking, resolve issues             | Assigned only, cannot access other users' data         |

**Premium citizens** get direct admin communication and priority support for faster resolution.

---

## 🔒 Security & Notes

- Refreshing the page while logged in **does not break private routes**.
- All sensitive keys are stored in **`.env`** files.
- **TanStack Query** is used for efficient API fetching.
- **SweetAlert2 / React Hot Toast** notifications are implemented for CRUD & payment actions.
- Fully responsive across **Mobile, Tablet, and Desktop** devices.
- All inputs are validated, and **no Lorem Ipsum** is used anywhere.
- **Boosted issues** always appear on top in lists.
- **Stripe / Payment Gateway** securely handles all transactions.

---

## 🔗 Useful Links

| Resource    | Link                                                       | Notes                                      |
| ----------- | ---------------------------------------------------------- | ------------------------------------------ |
| React.js    | [https://reactjs.org](https://reactjs.org)                 | Frontend library for building UI           |
| Vite        | [https://vitejs.dev](https://vitejs.dev)                   | Fast build tool & development server       |
| TailwindCSS | [https://tailwindcss.com](https://tailwindcss.com)         | Styling framework for responsive UI        |
| Firebase    | [https://firebase.google.com](https://firebase.google.com) | Auth, storage, and real-time DB            |
| MongoDB     | [https://www.mongodb.com](https://www.mongodb.com)         | Database for persistent storage            |
| Stripe      | [https://stripe.com](https://stripe.com)                   | Payment gateway for subscriptions & boosts |

---

## 🧑‍💻 Developer Information

| Field              | Details                                                          |
| ------------------ | ---------------------------------------------------------------- |
| Developer Name     | Tufayel Ahmed                                                    |
| Email              | [ta07092007@gmail.com](mailto:ta07092007@gmail.com)              |
| GitHub Profile     | [https://github.com/tufayel2007](https://github.com/tufayel2007) |
| Project Created On | November 13, 2025                                                |
| Tech Stack         | React, TailwindCSS, Firebase, MongoDB, Stripe, TanStack Query    |
| Contact            | [ta07092007@gmail.com](mailto:ta07092007@gmail.com)              |
| Contribution Guide | Fork → Branch → Commit → Pull Request                            |
| Project Status     | Active / Live                                                    |
| Live Demo          | [https://your-live-site.com](https://issue-hub-nine.vercel.app/) |

---

## 🌐 Connect & Vote for This Project

Support and follow the project on social platforms. Click the icons below:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tufayel2007)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tufayel)  
[![visit my protflio](https://my-protflio-web.vercel.app/)](https://my-protflio-web.vercel.app/)

> ⭐ **Tip:** Click the GitHub icon to star the repository or the social icons to follow & support the project.
