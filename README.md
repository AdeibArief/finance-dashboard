# Fintrack 

A finance dashboard built as part of a Frontend internship assignment using React, Vite, Tailwind CSS V4, DaisyUI, Zustand and recharts.

## Live Demo

[https://finance-dashboard-rust-seven.vercel.app/](https://finance-dashboard-rust-seven.vercel.app/)

## Tech Stack

- React + Vite
- Tailwind CSS v4 + DaisyUI
- Zustand (State management)
- Recharts (Charts)
- Lucide React (icons)

## Mock Data

| Field       | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| id          | Unique identifier                                                                    |
| date        | Transaction date (YYYY-MM-DD)                                                        |
| description | What the transaction was for                                                         |
| amount      | Amount in INR                                                                        |
| type        | Either income or expense                                                             |
| category    | One of: Salary, Freelance, Housing, Food, Entertainment, Utilities, Health, Shopping |

## Getting Started

```bash
git clone https://github.com/AdeibArief/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

## Features

| Feature                                   | Status |
| ----------------------------------------- | ------ |
| Dashboard with summary cards              | ✔️     |
| Balance trend line chart                  | ✔️     |
| Spending breakdown donut chart            | ✔️     |
| Transactions table with search and filter | ✔️     |
| CSV export (respects active filters)      | ✔️     |
| Role based UI (Viewer/Admin)              | ✔️     |
| Add, edit and delete transactions (Admin) | ✔️     |
| Insights page with 6 observation cards    | ✔️     |
| Dark mode                                 | ✔️     |
| localStorage persistence                  | ✔️     |
| Responsive with mobile hamburger menu     | ✔️     |
| Page fade transitions                     | ✔️     |
| Empty state handling                      | ✔️     |

## What I Built

| Section      | What it does                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard    | Summary cards with Balance, Income, Expenses and Savings Rate. Line chart for balance trend and donut chart for spending by category                          |
| Transactions | Full transaction table with live search, filter by type and category, CSV export that respects active filters                                                 |
| Insights     | 6 cards derived from transaction data — highest spending category, monthly comparison, savings rate, average expense, total income and biggest single expense |
| Role System  | Navbar toggle switches between Viewer and Admin. Admin unlocks Add and Delete transaction controls. Viewer sees data only                                     |

## Role Access

| Feature            | Viewer (👁️) | Admin (⚙️) |
| ------------------ | ----------- | ---------- |
| View Dashboard     | ✔️          | ✔️         |
| View Transactions  | ✔️          | ✔️         |
| Search and filter  | ✔️          | ✔️         |
| Export CSV         | ✔️          | ✔️         |
| Add transaction    | ❌          | ✔️         |
| Edit transaction   | ❌          | ✔️         |
| Delete transaction | ❌          | ✔️         |

## How State works

Everything lives in one Zustand store — transactions, filters, search and role. Components only subscribe to what they need so updates are instant.

For persistence I skipped Zustand's persist middleware and just used localStorage directly. On load it checks localStorage first and falls back to mock data if nothing is there. Every add, edit and delete saves back to localStorage.

## Folder Structure

```
src/
    components/
        layout/         -> Sidebar, Navbar
        dashboard/      -> SummaryCards, BalanceTrendChart, SpendingChart
        transactions/   -> TransactionTable, TransactionsFilters, AddTransactionModal,EditTransactionModal
    pages/              -> DashboardPage, TransactionsPage, InsightsPage
    store/              -> useStore.js
    data/               -> mockData.js (24 transactions across 3 months)
```
