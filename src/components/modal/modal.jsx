import React, { useState, useEffect } from "react";
import axios from "axios";
import "./modal.css";

export default function Modal({ isEdit, editData, setIsEdit, fetchArmaturs }) {
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        f8a1: '',
        f8a3: '',
        f12: '',
        f14: '',
        f16: '',
        f18: '',
        f20: '',
        f22: '',
        f25: '',
        f28: '',
        f32: ''
    });

    useEffect(() => {
        if (isEdit && editData) {
            setFormData(editData);
            setModal(true);
        }
    }, [isEdit, editData]);

    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            setIsEdit(false);
            setFormData({
                date: '',
                f8a1: '',
                f8a3: '',
                f12: '',
                f14: '',
                f16: '',
                f18: '',
                f20: '',
                f22: '',
                f25: '',
                f28: '',
                f32: ''
            });
        }
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const apiCall = isEdit
            ? axios.put(`http://localhost:3001/armatur/edite/${formData._id}`,
                formData,
                {
                    id: formData._id,
                })
            : axios.post('http://localhost:3001/armatur/add', formData);
        apiCall
            .then((res) => {
                console.log(res.data);
                toggleModal();
                fetchArmaturs(); // fetch data after submit
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Add
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <form onSubmit={onSubmit}>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="f8a1"
                                    value={formData.f8a1}
                                    onChange={handleChange}
                                    placeholder="Ф-8, А-1"
                                />
                                <input
                                    type="number"
                                    name="f8a3"
                                    value={formData.f8a3}
                                    onChange={handleChange}
                                    placeholder="Ф-8, А-3"
                                />
                                <input
                                    type="number"
                                    name="f12"
                                    value={formData.f12}
                                    onChange={handleChange}
                                    placeholder="Ф-12"
                                />
                                <input
                                    type="number"
                                    name="f14"
                                    value={formData.f14}
                                    onChange={handleChange}
                                    placeholder="Ф-14"
                                />
                                <input
                                    type="number"
                                    name="f16"
                                    value={formData.f16}
                                    onChange={handleChange}
                                    placeholder="Ф-16"
                                />
                                <input
                                    type="number"
                                    name="f18"
                                    value={formData.f18}
                                    onChange={handleChange}
                                    placeholder="Ф-18"
                                />
                                <input
                                    type="number"
                                    name="f20"
                                    value={formData.f20}
                                    onChange={handleChange}
                                    placeholder="Ф-20"
                                />
                                <input
                                    type="number"
                                    name="f22"
                                    value={formData.f22}
                                    onChange={handleChange}
                                    placeholder="Ф-22"
                                />
                                <input
                                    type="number"
                                    name="f25"
                                    value={formData.f25}
                                    onChange={handleChange}
                                    placeholder="Ф-25"
                                />
                                <input
                                    type="number"
                                    name="f28"
                                    value={formData.f28}
                                    onChange={handleChange}
                                    placeholder="Ф-28"
                                />
                                <input
                                    type="number"
                                    name="f32"
                                    value={formData.f32}
                                    onChange={handleChange}
                                    placeholder="Ф-32"
                                />
                                <button type="submit">
                                    {isEdit ? "Update" : "Create"} Record
                                </button>
                            </form>
                            <button className="close-modal" onClick={toggleModal}>
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
