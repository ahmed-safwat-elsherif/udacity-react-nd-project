import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <section className="flex h-[100vh] flex-col items-center justify-center">
      <div className="flex flex-col justify-center md:w-[60%]">
        <div className="font-edu text-center text-[4rem]">My Reads 📚</div>
        <div className="mt-[4rem] flex flex-col items-center justify-center gap-2">
          <Link to="/signup" className="btn btn-secondary w-[100%] sm:w-[60%] md:w-[50%] ">
            Signup
          </Link>
          <Link to="/login" className="btn btn-primary w-[100%] sm:w-[60%] md:w-[50%] ">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
