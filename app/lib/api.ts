const API_BASE_URL = process.env.EXPENSIFY_API_BASE_URL || 'http://localhost:8080';

export async function apiRegister(username: string, password: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    };

    return;
}

export async function apiLogin(username: string, password: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    };

    const data = await response.json();
    
    return data.token;
}

export async function apiFetchAccounts() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/accounts`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch accounts');
    }

    return await response.json();
}

export async function apiCreateAccount(name: string, balance: number) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ name, balance }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
    }

    return await response.json();
}

export async function apiDeleteAccount(accountId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account');
    }

    return;
}

export async function apiFetchIncomes() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/incomes`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch incomes');
    }

    return await response.json();
}

export async function apiCreateIncome(description: string, amount: number, date: string, accountId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/incomes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ description, amount, date, account_id: accountId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create income');
    }

    return await response.json();
}

export async function apiDeleteIncome(incomeId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/incomes/${incomeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete income');
    }

    return;
}

export async function apiFetchExpenses() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/expenses`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch expenses');
    }

    return await response.json();
}

export async function apiCreateExpense(description: string, amount: number, date: string, accountId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ description, amount, date, account_id: accountId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create expense');
    }

    return await response.json();
}

export async function apiDeleteExpense(expenseId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete expense');
    }

    return;
}

export async function apiFetchTransfers() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/transfers`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch transfers');
    }

    return await response.json();
}

export async function apiCreateTransfer(description: string, amount: number, date: string, fromAccountId: string, toAccountId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/transfers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ description, amount, date, source_account_id: fromAccountId, destination_account_id: toAccountId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create transfer');
    }

    return await response.json();
}

export async function apiDeleteTransfer(transferId: string) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/transactions/transfers/${transferId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete transfer');
    }

    return;
}