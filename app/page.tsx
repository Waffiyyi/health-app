"use client";

import React, {useEffect, useState} from "react";
import {Header} from "./components/Header";
import {SuggestionForm} from "./components/SuggestionForm";
import {SuggestionList} from "./components/SuggestionList";
import {Footer} from "./components/Footer";
import {AuthForm} from "./components/AuthForm";
import {DemoLogin} from "./components/DemoLogin";
import {exportSuggestionsToPDF} from "./utils/pdfGenerator";
import {FormData, LoginData, User, ApiResponse} from "@/app/types";

export default function HealthSuggestionsApp() {
    const [formData, setFormData] = useState<FormData>({age: "", goal: ""});
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    });
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        if (error) setError("");
    };

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData((prev) => ({...prev, [name]: value}));
    };

    const validateForm = (): boolean => {
        const ageNum = parseInt(formData.age);
        if (!formData.age.trim()) return setError("Age is required"), false;
        if (isNaN(ageNum) || ageNum <= 0 || ageNum > 150)
            return setError("Please enter a valid age between 1 and 150"), false;
        if (!formData.goal) return setError("Please select a health goal"), false;
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setShowLogin(false);
                setLoginData({email: "", password: ""});
                setError("");
            } else {
                setError(data.error || "Login failed");
            }
        } catch {
            setError("Login error. Please try again.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setSuggestions([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuggestions([]);

        try {
            const response = await fetch("/api/suggestions", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    age: Number.parseInt(formData.age),
                    goal: formData.goal,
                    userId: user?.id,
                }),
            });

            const data: ApiResponse = await response.json();
            if (data.success && data.suggestions) {
                setSuggestions(data.suggestions);
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = () => {
        exportSuggestionsToPDF({user, formData, suggestions});
    };

    const handleReset = () => {
        setFormData({age: "", goal: ""});
        setSuggestions([]);
        setError("");
    };

    if (!user) {
        return (
            <div className="container">
                <header className="header">
                    <h1 >Health & Wellness Suggestions</h1 >
                    <p >Please log in to get personalized recommendations</p >
                </header >
                <main className="main-content">
                    <div className="auth-container">
                        <div className="auth-tabs">
                            <button
                                className={`auth-tab ${!showLogin ? "active" : ""}`}
                                onClick={() => setShowLogin(false)}
                            >
                                Quick Demo
                            </button >
                            <button
                                className={`auth-tab ${showLogin ? "active" : ""}`}
                                onClick={() => setShowLogin(true)}
                            >
                                Login
                            </button >
                        </div >
                        {showLogin ? (
                            <AuthForm
                                loginData={loginData}
                                onChange={handleLoginInputChange}
                                onSubmit={handleLogin}
                                loading={loginLoading}
                                error={error}
                            />
                        ) : (
                            <DemoLogin
                                onContinue={() =>
                                    setUser({
                                        id: "demo",
                                        email: "demo@example.com",
                                        name: "Demo User",
                                    })
                                }
                            />
                        )}
                    </div >
                </main >
            </div >
        );
    }

    return (
        <div className="container">
            <Header user={user} onLogout={handleLogout}/>

            <main className="main-content">
                <SuggestionForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    error={error}
                    loading={loading}
                />

                {suggestions.length > 0 && (
                    <SuggestionList
                        suggestions={suggestions}
                        onExport={handleExportPDF}
                    />
                )}
            </main >

            <Footer />
        </div >
    );
}