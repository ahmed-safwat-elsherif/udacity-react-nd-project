import React, { useCallback, useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return (
    <header>
      <nav className="flex w-[100%] flex-col p-3 sm:flex-row">
        <div className="w-[100%] min-w-[200px] sm:w-[20%]">
          <Link to="/" className="font-edu text-[1.5rem]">
            My Reads 📚
          </Link>
        </div>
        <hr className="mb-5 block sm:hidden" />
        <div className="flex flex-1 items-center justify-center gap-5 sm:justify-end">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => 'nav-link ' + (isActive ? 'underline' : '')}
              >
                Profile
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) => 'nav-link ' + (isActive ? 'underline' : '')}
              >
                Search
              </NavLink>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : pathname !== '/login' ? (
            <NavLink
              to="/login"
              className="rounded-full border-2 border-indigo-600 px-5 text-center  transition-all hover:bg-indigo-600 focus-visible:bg-indigo-600"
            >
              Login
            </NavLink>
          ) : (
            <NavLink
              to="/signup"
              className="rounded-full border-2 border-teal-600 px-5 text-center  transition-all hover:bg-teal-600 focus-visible:bg-teal-600"
            >
              Signup
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
