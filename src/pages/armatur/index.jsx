import React, { useEffect, useState } from "react";
import "./style.css";
import Modal from "../../components/modal/modal";
import axios from "axios";

export default function Armatur() {
    const [armaturs, setArmaturs] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchArmaturs();
    }, []);

    const fetchArmaturs = () => {
        axios.get(`http://localhost:3001/armatur`)
            .then((res) => {
                setArmaturs(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    };

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
        { title: "Actions", key: "actions" }
    ];

    const calculateSum = (key) => {
        return armaturs.reduce((sum, record) => {
            return sum + (parseFloat(record[key]) || 0);
        }, 0);
    };

    const sums = columns.reduce((acc, column) => {
        if (column.key !== "date" && column.key !== "actions") {
            acc[column.key] = calculateSum(column.key);
        }
        return acc;
    }, {});

    const totalSum = Object.values(sums).reduce((acc, sum) => acc + sum, 0);

    const handleEdit = (record) => {
        setIsEdit(true);
        setEditData(record);
    };

    const handleRemove = (id) => {
        axios.put(`http://localhost:3001/armatur/delet/${id}`,
            {
                id: id,
            },)
            .then(() => {
                const deletedV = armaturs.find(d => d._id === id)
                const newArmaturs = armaturs.filter(d => d !== deletedV)
                setArmaturs([
                    ...newArmaturs
                ])
            })
            .catch((err) => {
                console.error("Error deleting data:", err);
            });
    };

    return (
        <div className="container">
            <Modal
                isEdit={isEdit}
                editData={editData}
                setIsEdit={setIsEdit}
                fetchArmaturs={fetchArmaturs} />
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
                                column.key === "actions" ? (
                                    <td key={colIndex}>
                                        <button onClick={() => handleEdit(record)}>Edit</button>
                                        <button onClick={() => handleRemove(record._id)}>Remove</button>
                                    </td>
                                ) : (
                                    <td key={colIndex}>{record[column.key] || ''}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {columns.map((column, index) => (
                            <td key={index}>
                                {column.key === "date" ? "Ընդամենը" : sums[column.key]}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td colSpan={columns.length}>Ընդհանուր քանակը: {totalSum}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
