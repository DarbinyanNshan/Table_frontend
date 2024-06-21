import React, { useEffect, useState } from "react";
import "./style.css";
import Modal from "../../components/modal/modal";
import axios from "axios";

export default function Armatur() {
   const [armaturs, setArmaturs] = useState([]);

   useEffect(() => {
       axios.get(`http://localhost:3001/armatur`)
           .then((res) => {
            setArmaturs(res.data)
           })
   }, [])
   const columns = [
      { title: "Ամսաթիվ", key: "date" },
      { title: "Ф-8, А-1", key: "f8a1" },
      { title: "Ф-8, А-3", key: "f8a3" },
      { title: "Ф-12", key: "f12" },
      { title: "Ф-14", key: "f14" },
      { title: "Ф-16", key: "f16" },
      { title: "Ф-18", key: "f18" },
      { title: "Ф-20", key: "f20" },
      { title: "Ф-22", key: "f22" },
      { title: "Ф-25", key: "f25" },
      { title: "Ф-28", key: "f28" },
      { title: "Ф-32", key: "f32" },
   ];

   return (
      <div className="container">
         <Modal />
         <table className="table">
            <thead>
               <tr>
                  {columns.map((c, index) => (
                     <th key={index}>{c.title}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {armaturs.map((record, rowIndex) => (
                  <tr key={rowIndex}>
                     {columns.map((column, colIndex) => (
                        <td key={colIndex}>{record[column.key] || ''}</td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
