import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';
import Header from './components/Header';
import './styles/global.css';
import MoviesPage from "./containers/MoviesPage.tsx"; // глобальные стили

const router = createBrowserRouter([
    { path: '/', element: <MoviesPage /> },
    { path: '/movie/:id', element: <MovieDetailPage /> },
]);

export const RootApp: React.FC = () => (
    <div>
        <Header />
        <RouterProvider router={router} />
    </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(<RootApp />);