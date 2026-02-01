import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const word = value.trim();
    if (word) {
      navigate(`/term/${word.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search term..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: "0.5rem", width: "200px" }}
      />
      <button type="submit" style={{ marginLeft: "0.5rem", padding: "0.5rem" }}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
