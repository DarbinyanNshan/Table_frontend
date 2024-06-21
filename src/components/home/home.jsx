import React from "react";
import "./style.css";

import { NavLink } from "react-router-dom";;

export default function Home() {

    return (
        <div className="nav_links">
            <NavLink className={"link one"} to="/cement">Ցեմենտ</NavLink>
            <NavLink className={"link two"} to="/armatur">Արմատուր </NavLink>
        </div>
    )
}