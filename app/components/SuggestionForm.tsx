import React from "react";
import {FormData} from "@/app/types";

interface SuggestionFormProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
    error: string;
    loading: boolean;
}

export const SuggestionForm: React.FC<SuggestionFormProps> = ({
                                                                  formData,
                                                                  onChange,
                                                                  onSubmit,
                                                                  onReset,
                                                                  error,
                                                                  loading,
                                                              }) => (
    <form onSubmit={onSubmit} className="form">
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="age" className="label">Age *</label >
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={onChange}
                    className="input"
                    placeholder="Enter your age"
                    min="1"
                    max="150"
                    required
                />
            </div >

            <div className="form-group">
                <label htmlFor="goal" className="label">Health Goal *</label >
                <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={onChange}
                    className="select"
                    required
                >
                    <option value="">Select your primary goal</option >
                    <option value="Energy">Boost Energy</option >
                    <option value="Sleep">Improve Sleep</option >
                    <option value="Focus">Enhance Focus</option >
                </select >
            </div >
        </div >

        {error && (
            <div className="error-message" role="alert">
                {error}
            </div >
        )}

        <div className="button-group">
            <button
                type="submit"
                className="button button-primary"
                disabled={loading}
            >
                {loading ? "Getting Suggestions..." : "Get Suggestions"}
            </button >
            <button
                type="button"
                onClick={onReset}
                className="button button-secondary"
                disabled={loading}
            >
                Reset
            </button >
        </div >
    </form >
);
