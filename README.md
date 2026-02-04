# 💰 Expensify

A modern personal finance management frontend built with Next.js, featuring JWT authentication, real-time account management, and transaction tracking. Seamlessly manage your expenses, income, and transfers with an intuitive user interface.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - UI library
- **Docker & Docker Compose** - Containerization
- **pnpm** - Package manager

## 📋 Prerequisites

- Docker and Docker Compose
- Make (optional, for convenience commands)
- Node.js 18+ (for local development)
- pnpm (recommended) or npm

## 🛠️ Getting Started

Use the following make commands to run the application:

```bash
# Start development server
make dev

# Start application with Docker
make up

# Stop the application
make down

# View logs
make logs
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔐 Authentication

The application uses JWT tokens for authentication, managed through the `AuthContext`.

### Register
Navigate to `/auth/register` to create a new account.

### Login
Navigate to `/auth/login` to authenticate with your credentials.

The JWT token is automatically stored and included in API requests to the backend.

## 📚 Features

### 🏠 Home
- See a comprehensive summary of your financial overview
- View total balance across all accounts
- Display total incomes received
- Display total expenses spent
- Show recent transfers
- Quick access to all accounts

**Location:** `/`

### 🏦 Account Management
- View all your accounts with current balances
- Create new accounts
- Update account details
- Delete accounts

**Location:** `/accounts`

### 💸 Expense Tracking
- Record your expenses with descriptions and amounts
- Track which account expenses are linked to
- View all expenses in a calendar or list view
- Delete expense records

**Location:** `/expenses`

### 💰 Income Management
- Log income sources and amounts
- Categorize income to specific accounts
- Track income history
- Manage income records

**Location:** `/incomes`

### 🔄 Money Transfers
- Transfer money between your accounts
- Track transfer history
- View source and destination details
- Undo transfers if needed

**Location:** `/transfers`

## 🏗️ Project Structure

```
app/
├── auth/                    # Authentication pages (login, register)
├── dashboard/               # Main application dashboard
│   ├── accounts/           # Account management
│   └── transactions/       # Transaction features
│       ├── expenses/       # Expense tracking
│       ├── incomes/        # Income management
│       └── transfers/      # Money transfers
├── components/             # Reusable UI components
│   └── ui/                 # Base UI components
├── contexts/               # React contexts (Auth)
└── lib/                    # Utilities and API client
```

## 🔌 API Integration

The frontend communicates with the Expensify backend API. Configure the API endpoint:

```typescript
// lib/api.ts
const API_BASE_URL = process.env.EXPENSIFY_API_BASE_URL || 'http://localhost:8080';
```

### Environment Variables

Create an environment variable:

```bash
export EXPENSIFY_API_BASE_URL=http://localhost:8080
```
