import React from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useSearchParams,
} from 'react-router-dom';
import usePlayerNames from '../hooks/usePlayerNames';
import Loading from './Loading';
import Sidebar from './Sidebar';

const Players = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams(location.search);

  const { response: names, loading } = usePlayerNames();

  if (loading === true) return <Loading />;

  return (
    <div className='container two-column'>
      <Sidebar title='Players' list={names} />
      {/* show nested component defined in nested Route */}
      <Outlet />
    </div>
  );
};

export default Players;
