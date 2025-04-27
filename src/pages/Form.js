import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./styles/Form.css";

const Form = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        status: true
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSend = {
            ...formData,
            status: formData.status === 'active'
        };

        axios.post("http://localhost:5000/cameras", dataToSend, {
            headers: {"Content-Type" : "application/json"}
        })
        .then(response => {
            console.log("Добавленная камера:", response.data);
            navigate('/');
        })
        .catch(error => console.error("Ошибка создания:", error));
    };

    return (
        <div>
            <Header />
            <div className="back_form">Новая камера</div>
            <div className="cameras_back_form"></div>
            <form onSubmit={handleSubmit} className="cameras_front_form">
                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label htmlFor="name" style={{fontSize: "20px", fontWeight: "bold", marginRight: "55px"}}>
                        Введите название:
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        style={{padding: "8px", width: "300px"}} 
                        required 
                    />
                </div>
                
                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label htmlFor="location" style={{fontSize: "20px", fontWeight: "bold", marginRight: "10px"}}>
                        Введите расположение:
                    </label>
                    <input 
                        type="text" 
                        id="location" 
                        value={formData.location}
                        onChange={handleChange}
                        style={{padding: "8px", width: "300px"}} 
                        required 
                    />
                </div>
                
                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label htmlFor="status" style={{fontSize: "20px", fontWeight: "bold", marginRight: "65px"}}>
                        Выберите статус:
                    </label>
                    <select 
                        id="status" 
                        value={formData.status}
                        onChange={handleChange}
                        style={{padding: "8px", width: "320px"}}
                    >
                        <option value="active">Активна</option>
                        <option value="inactive">Не работает</option>
                    </select>
                </div>
                
                <button type="submit" className="button_form">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default Form;