import React from "react";
import { User } from "@/app/types";

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => (
    <header className="header">
        <div className="header-content">
            <div>
                <h1>Health & Wellness Suggestions</h1>
                <p>Get personalized recommendations based on your age and health goals</p>
            </div>
            <div className="user-info">
                <span>Welcome, {user.name}!</span>
                <button onClick={onLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </div>
    </header>
);
