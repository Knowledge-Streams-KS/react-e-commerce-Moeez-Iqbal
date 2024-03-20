import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import Header from "../components/Header";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import ProductDetails from "../pages/ProductDetail";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import User from "../pages/User";
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import PrivateRoute from "./PrivateRoutes";


const AppRoutes = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path="" element={<DefaultLayout />}>
            <Route path="" element={<Home />}></Route>
  
            <Route path="/products/:categoryName?" element={<Products />} />
  
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/product-details/:productID?"
              element={<ProductDetails />}
            />
          </Route>

          
  
          <Route path="/user" element={<User />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
  
          <Route
            path="new"
            element={
              <PrivateRoute>
                <div>
                  <h1>CHild 1</h1>
                </div>
                <h1>Child 2</h1>
              </PrivateRoute>
            }
          ></Route>
  
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    );
  };
  
  export default AppRoutes;