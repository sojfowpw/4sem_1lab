import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./styles/Detail.css";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [cameraData, setCameraData] = useState({
        name: '',
        location: '',
        status: true
    });
    
    const nameRef = useRef(null);
    const locationRef = useRef(null);

    useEffect(() => {
        const loadItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cameras/${id}`);
                    setCameraData(response.data);
                    if (nameRef.current && locationRef.current) {
                        nameRef.current.value = response.data.name;
                        locationRef.current.value = response.data.location;
                    }
            }
            catch (error) {
                console.error("Ошибка загрузки:", error);
            }
        };
        loadItem();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name: nameRef.current.value,
            location: locationRef.current.value,
            status: cameraData.status
        };

        axios.put(`http://localhost:5000/cameras/${id}`, JSON.stringify(updatedData), {
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                console.log("Обновлённая камера:", response.data);
                navigate('/');
            })
            .catch(error => console.error("Ошибка обновления:", error));
    };

    return (
        <div>
            <Header />
            <div className="back_detail">Редактирование камеры</div>
            <div className="cameras_back_detail"></div>
            <form onSubmit={handleSubmit} className="cameras_front_detail">
                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label htmlFor="name" style={{fontSize: "20px", fontWeight: "bold", marginRight: "75px"}}>Название:</label>
                    <input id="name" type="text" ref={nameRef} defaultValue={cameraData.name} style={{padding: "8px", width: "300px"}} 
                    required />
                </div>

                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label htmlFor="location" style={{fontSize: "20px", fontWeight: "bold", marginRight: "10px"}}>Местоположение:</label>
                    <input id="location" type="text" ref={locationRef} defaultValue={cameraData.location} style={{padding: "8px", width: "300px"}}
                    required />
                </div>
                
                <div style={{display: "flex", alignItems: "center", marginBottom: "12px", padding: "20px"}}>
                    <label style={{fontSize: "20px", fontWeight: "bold", marginRight: "25px"}}>Текущий статус:</label>
                    <span style={{color: cameraData.status ? "#4CAF50" : "#ff4a4a", fontWeight: "bold", fontSize: "20px"}}>
                    {cameraData.status ? "Активна" : "Не работает"}</span>
                </div>
                <button type="submit" className="button_detail">Сохранить</button>
            </form>
        </div>
    );
};

export default Detail;