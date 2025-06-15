import React from "react";
import { LoginData } from "@/app/types";

interface Props {
    loginData: LoginData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    error: string;
}

export const AuthForm: React.FC<Props> = ({ loginData, onChange, onSubmit, loading, error }) => (
    <form onSubmit={onSubmit} className="auth-form">
        <h3>Login to Your Account</h3>
        <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={onChange}
                className="input"
                placeholder="Enter your email"
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={onChange}
                className="input"
                placeholder="Enter your password"
                required
            />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>
        <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
        </div>
    </form>
);