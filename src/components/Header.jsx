import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My E-Commerce Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><NavLink exact to="/"  className="hover:text-gray-300">Home</NavLink></li>
            <li><NavLink to="/products" className="hover:text-gray-300">Products</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
