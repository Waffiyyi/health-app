import React from "react";

interface SuggestionListProps {
  suggestions: string[];
  onExport: () => void;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onExport }) => (
  <div className="suggestions-container">
    <div className="suggestions-header">
      <h2>Your Personalized Suggestions</h2>
      <button onClick={onExport} className="button button-export">
        📄 Export to PDF
      </button>
    </div>
    <div className="suggestions-list">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="suggestion-item">
          <span className="suggestion-number">{index + 1}</span>
          <p>{suggestion}</p>
        </div>
      ))}
    </div>
  </div>
);
