import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productID } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://fakestoreapi.com/products/${productID}`
      );
      setProductData(resp.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productID]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : productData ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Product Details</h1>
          <div className="border border-gray-300 rounded-md p-4">
            <h2 className="font-bold text-lg mb-2">{productData.title}</h2>
            <p className="text-gray-500 mb-2">Price: ${productData.price}</p>
            <img
              src={productData.image}
              alt={productData.title}
              className="w-full h-auto mb-2"
            />
            <p>{productData.description}</p>
          </div>
        </>
      ) : (
        <p className="text-center">No product found</p>
      )}
    </div>
  );
};

export default ProductDetails;
