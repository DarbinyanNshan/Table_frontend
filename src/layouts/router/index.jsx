import React from "react";
import { Route, Routes } from "react-router-dom";
import Cement from "../../pages/cement";
import Armatur from "../../pages/armatur";
import Home from "../../components/home/home";




export const Router = () => {


    return (
        <div>
            <Routes> 
                <Route path="/" element={<Home/>} />   
                <Route path="/cement" element={<Cement/>} />   
                <Route path="/armatur" element={<Armatur/>} />   
            </Routes>
        </div>
    )
}