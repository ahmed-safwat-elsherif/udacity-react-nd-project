import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAccount } from '../api/auth';

export const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPwdFieldActive, setIsPwdFieldActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    createAccount({ username, password })
      .then(() => {
        toast.success('Now you have an account! 🎉🎉');
        (() => {
          let timer: NodeJS.Timeout;
          timer = setTimeout(() => {
            navigate('/login', { replace: true });
            clearTimeout(timer);
          }, 1000);
        })();
      })
      .catch(err => {
        const res = err.response;
        if (res.data.isExist) toast.error('User is already exist!!');
        setPassword('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <form>
        <div className="mx-3 flex h-[90vh] flex-col justify-center space-y-4 sm:mx-auto sm:w-[80%] md:w-[50%]">
          <h2 className="mb-5 text-center text-[3rem]">
            - Signup
            {isPwdFieldActive ? '🤐' : '😃'}-
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
              className="btn btn-secondary mt-5 w-[50%] min-w-[100px]"
              disabled={loading || !username || !password}
              type="submit"
              onClick={handleSignup}
            >
              {loading ? 'Loading ..' : username && password ? 'Signup 🤩' : 'Signup 😴'}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/login" className="hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
