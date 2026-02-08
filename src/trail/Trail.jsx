import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header/Header.jsx";
import './Trail.css';
import LoadingSpinner from "./loading/spinner/LoadingSpinner.jsx";

const ProductList = React.lazy(() => import("./product/ProductList.jsx"));
const Register = React.lazy(() => import("./auth/Register.jsx"));
const Login = React.lazy(() => import("./auth/Login.jsx"));
const Logout = React.lazy(() => import("./auth/Logout.jsx"));
const AddProduct = React.lazy(() => import("./product/AddProduct.jsx"));
const Favourites = React.lazy(() => import("./product/favourite/Favourites.jsx"));
const AboutMe = React.lazy(() => import("./about/AboutMe.jsx"));

export default function Trail() {
    return (
        <BrowserRouter>
            <Header/>
            <Suspense fallback={<LoadingSpinner/>}>
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/addpost" element={<AddProduct/>}/>
                    <Route path="/favourites" element={<Favourites/>}/>
                    <Route path="/about-me" element={<AboutMe/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
