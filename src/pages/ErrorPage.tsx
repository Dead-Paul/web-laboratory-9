import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Unexpected error</h2>
      <p>Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
