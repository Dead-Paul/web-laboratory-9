import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTerm, clearTerm } from '../store/resourcesSlice';
import { addToHistory } from '../store/glossarySlice';
import { RootState, AppDispatch } from '../store/store';

const TermPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { term, isLoading, error } = useSelector((state: RootState) => state.resources);
  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    if (id) {
      dispatch(fetchTerm({ word: id, lang }));
      dispatch(addToHistory(id));
    }
    return () => {
      dispatch(clearTerm());
    };
  }, [id, lang, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!term) return <p>No term found</p>;

  return (
    <div>
      <h2>{term.word}</h2>
      {term.meanings.map((m, idx) => (
        <div key={idx}>
          <h3>{m.partOfSpeech}</h3>
          <ul>
            {m.definitions.map((d: any, i: number) => (
              <li key={i}>{d.definition}</li>
            ))}
          </ul>
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default TermPage;
