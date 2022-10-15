import React, { useEffect } from 'react';
import {
  HashRouter, Navigate, Route, Routes
} from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { fetchHeroes } from './features/heroesSlice';
import { NotFoundPage } from './components/NotFoundPage';
import { HeroesList } from './components/HeroesList';
import { HeroForm } from './components/HeroForm';
import { HeroModal } from './components/HeroModal';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HeroesList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/heroes/">
          <Route index element={<HeroesList />} />
          <Route path=":page" element={<HeroesList />} />
        </Route>
        <Route path="/hero/:heroId" element={<HeroModal />} />
        <Route path="/hero/edit">
          <Route index element={<HeroForm />} />
          <Route path=":heroId" element={<HeroForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
