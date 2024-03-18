import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id} className="border border-gray-300 rounded-md p-4">
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-gray-500 mb-2">Price: ${product.price}</p>
              <img src={product.image} alt={product.title} className="w-full h-auto mb-2" />
              <NavLink to={`/product-details/${product.id}`}>
                {product.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
