import { useOutletContext } from 'react-router-dom';

const TermExamples: React.FC = () => {
  const term = useOutletContext<any>();

  if (!term || !term.meanings) return <p>No examples found</p>;

  return (
    <div>
      <h3>Examples for "{term.word}"</h3>
      {term.meanings.map((m: any, idx: number) => (
        <ul key={idx}>
          {m.definitions.map((d: any, i: number) => (
            <li key={i}>{d.example || '-'}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default TermExamples;
