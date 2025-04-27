import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./styles/Home.css";

const Home = () => {
    const [cameras, setCameras] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/cameras");
                setCameras(response.data);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };
        loadData();
    }, [location.pathname]);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/cameras/${id}`)
            .then(() => {
                setCameras(prevCameras => prevCameras.filter(item => item.id !== id));
                alert("Камера удалена");
            })
            .catch(error => console.error("Ошибка удаления:", error));
    };

    return (
        <div>
            <Header />
            <div className="back">Камеры видеонаблюдения</div>
            <div className="cameras_back"></div>
            <div className="cameras_front">
                <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                    {cameras.map(item => (
                        <li key={item.id} style={{padding: "12px 16px", borderBottom: "3px solid #f4f4f4", backgroundColor: '#fff',
                            display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Link to={`/detail/${item.id}`} style={{textDecoration: "none", display: "block", borderLeft: item.status ? "5px solid #4CAF50" : "5px solid #ff4a4a",
                                padding: "8px", flexGrow: 1}}>
                                <div style={{fontWeight: "bold", color: "black"}}>{item.name}</div>
                                <div style={{color: "black"}}>Местоположение: {item.location}</div>
                                <div style={{color: "black"}}>{item.status ? "Активна" : "Не работает"}</div>
                            </Link>
                            <button className="button_delete" onClick={() => deleteItem(item.id)} style={{alignSelf: "flex-start"}}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
            <h1 style={{textAlign: "center", margin: "18px", fontSize: "21px"}}>Обеспечение безопасности в образовательных организациях</h1>
            <button className="button_add" onClick={() => window.location.href='/add'}>Добавить камеру</button>
        </div>
    );
};

export default Home;