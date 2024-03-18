import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './pages/Products';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetail';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryName?" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product-details/:productID?" element={<ProductDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

