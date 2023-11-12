import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout/Layout';
import PokemonList from './pages/pokemon-list/PokemonList';
import FavoritePokemonList from './pages/favorite-pokemon-list/FavoritePokemonList';
import { ReactNode } from 'react';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {createRoute('/', <PokemonList />)}
        {createRoute('/favorites', <FavoritePokemonList />)}
      </Routes>
    </BrowserRouter>
  );
}

function createRoute(path: string, element: ReactNode) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <Layout>
          {element}
        </Layout>
      }
    />
  );
}

export default App;
