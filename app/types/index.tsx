export interface FormData {
    age: string;
    goal: string;
}

export interface ApiResponse {
    success: boolean;
    suggestions?: string[];
    error?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}