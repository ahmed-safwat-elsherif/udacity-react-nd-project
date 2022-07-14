import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <section className="flex h-[80vh] flex-col items-center justify-center">
      <p className="mb-5 text-[2rem]">404:Page {pathname} is not found</p>

      <Link to="/" className="btn btn-info text-[1.2rem]">
        Back to home 🏠
      </Link>
    </section>
  );
};
