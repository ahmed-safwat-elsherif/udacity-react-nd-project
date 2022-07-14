import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { AuthContext } from './contexts/AuthContext';
import { NotFound } from './pages/404';
import { Search } from './pages/Search';
import { BooksContextProvider } from './contexts/BooksContext';
import { BookDetail } from './pages/BookDetail';

function App() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BooksContextProvider>
      {pathname !== '/' && <Navbar />}
      <main className="App">
        <Routes>
          <Route index element={isLoggedIn ? <Navigate to="/profile" /> : <Home />} />
          <Route path="profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/profile" />} />
          <Route path="login" element={!isLoggedIn ? <Login /> : <Navigate to="/profile" />} />
          <Route path="search" element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
          <Route path="book/:id" element={isLoggedIn ? <BookDetail /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BooksContextProvider>
  );
}

export default App;
