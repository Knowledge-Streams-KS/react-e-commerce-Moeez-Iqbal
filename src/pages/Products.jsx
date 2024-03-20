import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const Products = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState(''); 
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let resp;
        if (categoryName) {
          resp = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        } else {
          resp = await axios.get("https://fakestoreapi.com/products");
        }
        setProducts(resp.data);
        setLoading(false);
      } catch (e) {
        console.log("ERROR: ", e);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  useEffect(() => {
    let sorted = [...filteredProducts];
    if (sortOption === 'priceAscending') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDescending') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'title') {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSortedProducts(sorted);
  }, [sortOption, filteredProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="ml-2 px-4 py-2 bg-gray-200 rounded-md"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            value="priceAscending"
            checked={sortOption === 'priceAscending'}
            onChange={() => setSortOption('priceAscending')}
          />
          Sort by Price (Low to High)
        </label>
        <label>
          <input
            type="checkbox"
            value="priceDescending"
            checked={sortOption === 'priceDescending'}
            onChange={() => setSortOption('priceDescending')}
          />
          Sort by Price (High to Low)
        </label>
        <label>
          <input
            type="checkbox"
            value="title"
            checked={sortOption === 'title'}
            onChange={() => setSortOption('title')}
          />
          Sort by Title
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <li key={product.id} className="border border-gray-300 rounded-md p-4">
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-gray-500 mb-2">Price: ${product.price}</p>
              <img src={product.image} alt={product.title} className="w-full h-auto mb-2" />
              <NavLink to={`/product-details/${product.id}`}>
                {product.title}
              </NavLink>
              <div>
              <button onClick={() => handleAddToCart(product)} className=' text-justify px-3 py-3 bg-gray-600 rounded-md hover:bg-red-600'>Add to Cart</button>
             </div>
            </li>
          ))}
        </ul>
      )}

      <div className='text-center'>
        <h2 className='text-2xl text-center py-4 my-4 bg-purple-700 rounded-md' >Shopping Cart</h2>
        <ol>
          {cart.map((item) => (
            <li key={item.id} className=' text-2xl text-center py-4 my-4'>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveFromCart(item.id)} className='text-1xl text-center py-4 my-4 bg-orange-600 rounded-md px-2 hover:bg-blue-600'>Remove</button>
            </li>
          ))}
        </ol>
        <button onClick={handleClearCart} className='bg-orange-600 rounded-md text-3xl px-2 py-3 hover:bg-yellow-500'>Clear Cart</button>
      </div>
    </div>
  );
};

export default Products;
