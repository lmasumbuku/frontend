import React, { useEffect, useState } from "react";
import axios from "axios";

const MenuList = () => {
  const [plats, setPlats] = useState([]);

  useEffect(() => {
    const fetchPlats = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://backend-fastapi-cvi0.onrender.com/menu/mes-plats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlats(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des plats :", error);
      }
    };

    fetchPlats();
  }, []);

  return (
    <div>
      <h2>Mon Menu</h2>
      <ul>
        {plats.map((plat) => (
          <li key={plat.id}>
            {plat.name} - {plat.price}€<br />
            {plat.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
