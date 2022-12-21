import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { slugify } from '../utils';

export default function Sidebar({ title, list }) {
  return (
    <div>
      <h3 className='header'>{title}</h3>
      <ul className='sidebar-list'>
        {list.map((item) => (
          <CustomLink key={item} to={slugify(item)}>
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
}

function CustomLink({ to, children }) {
  const location = useLocation();
  const splitedPath = location.pathname.split('/');
  // getting last array item
  const isMatch = splitedPath[splitedPath.length - 1] === to;

  return (
    <div>
      {isMatch ? '✨' : ''}
      <Link
        className={isMatch ? 'active' : ''}
        to={{
          pathname: to,
          search: location.search,
        }}
      >
        {children}
      </Link>
    </div>
  );
}
