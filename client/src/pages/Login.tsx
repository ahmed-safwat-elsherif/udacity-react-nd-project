import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPwdFieldActive, setIsPwdFieldActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoggedIn, login } = useContext(AuthContext);

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    login(
      { username, password },
      {
        onSuccess() {
          navigate('/profile', { replace: true });
        },
        onError() {
          toast.error('Ummm .. username or password may not be right 🤔');
          setPassword('');
        },
        onFinally() {
          setLoading(false);
        },
      }
    );
  };

  if (isLoggedIn) return <Navigate to={'/profile'} replace />;
  return (
    <section>
      <form>
        <div className="mx-3 flex h-[90vh] flex-col justify-center space-y-4 sm:mx-auto sm:w-[80%] md:w-[50%]">
          <h2 className="mb-5 text-center text-[3rem]">
            - Login
            {isPwdFieldActive ? '🤐' : '😁'}-
          </h2>
          <div className="text-[0.8rem] font-bold text-red-400">{/** error area */}</div>
          <div className="flex items-center justify-center">
            <input
              disabled={loading}
              placeholder="Your username"
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="input-field w-[100%] sm:w-[70%]"
            />
          </div>
          <div className="flex items-center justify-center">
            <input
              disabled={loading}
              onBlur={() => setIsPwdFieldActive(false)}
              placeholder="Your password"
              type="password"
              id="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setIsPwdFieldActive(true);
              }}
              className="input-field w-[100%] sm:w-[70%]"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="btn btn-primary mt-5 w-[50%] min-w-[100px]"
              disabled={loading || !username || !password}
              type="submit"
              onClick={handleSignup}
            >
              {loading ? 'Loading ..' : username && password ? 'Login 🤩' : 'Login 😴'}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/signup" className="hover:underline">
              Don't have account?
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
