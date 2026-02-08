import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import './Trail.css';
import LoadingSpinner from "./components/spinner/LoadingSpinner.jsx";

const PostList = React.lazy(() => import("./components/post/list/PostList.jsx"));
const Register = React.lazy(() => import("./components/auth/Register.jsx"));
const Login = React.lazy(() => import("./components/auth/Login.jsx"));
const Logout = React.lazy(() => import("./components/auth/Logout.jsx"));
const AddPost = React.lazy(() => import("./components/post/add/AddPost.jsx"));
const Favourites = React.lazy(() => import("./components/post/favourite/Favourites.jsx"));
const AboutMe = React.lazy(() => import("./components/about/AboutMe.jsx"));

export default function Trail() {
    return (
        <BrowserRouter>
            <Header/>
            <Suspense fallback={<LoadingSpinner/>}>
                <Routes>
                    <Route path="/" element={<PostList/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/addpost" element={<AddPost/>}/>
                    <Route path="/favourites" element={<Favourites/>}/>
                    <Route path="/about-me" element={<AboutMe/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
