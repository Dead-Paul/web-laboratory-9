import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { addToHistory } from '../store/glossarySlice';
import { setLanguage } from '../store/languageSlice';

const letters = ['A','B','C','D','E'];

const Glossary: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const history = useSelector((state: RootState) => state.glossary.searchHistory);

  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    dispatch(addToHistory(query));
    navigate(`/term/${query}`);
  };

  return (
    <div>
      <h2>Glossary</h2>

      <div>
        <label>
          Language:
          <select
            value={lang}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
          >
            <option value="en">English</option>
            <option value="de">German</option>
          </select>
        </label>
      </div>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h3>Letters:</h3>
      <ul>
        {letters.map((l) => (
          <li key={l}><Link to={`/term/${l.toLowerCase()}`}>{l} term example</Link></li>
        ))}
      </ul>

      <h3>History:</h3>
      <ul>
        {history.map((word) => (
          <li key={word}><Link to={`/term/${word}`}>{word}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Glossary;
