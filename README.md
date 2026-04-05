# Fintrack Dashboard

A finance dashboard built as part of a frontend internship assignment. The goal was to build something clean, functional and easy to understand — not overly complex.

## Live Demo

[https://finance-dashboard-rust-seven.vercel.app/](https://finance-dashboard-rust-seven.vercel.app/)

## Tech Stack

- React + Vite
- Tailwind CSS v4 + DaisyUI
- Zustand
- Recharts

## Getting Started

```bash
git clone https://github.com/AdeibArief/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

## What I Built

| Section      | What it does                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard    | Summary cards with Balance, Income, Expenses and Savings Rate. Line chart for balance trend and donut chart for spending by category                          |
| Transactions | Full transaction table with live search, filter by type and category, CSV export that respects active filters                                                 |
| Insights     | 6 cards derived from transaction data — highest spending category, monthly comparison, savings rate, average expense, total income and biggest single expense |
| Role System  | Navbar toggle switches between Viewer and Admin. Admin unlocks Add and Delete transaction controls. Viewer sees data only                                     |

## How I Approached It

I kept the state in one Zustand store — transactions, filters, search query and role all in one place. Components subscribe to only what they need so filtering is reactive and instant without any extra logic.
