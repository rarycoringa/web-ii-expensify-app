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

export async function apiCreateIncome() {}

export async function apiCreateExpense() {}

export async function apiCreateTransfer() {}