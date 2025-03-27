import React, { useEffect, useState } from "react";
import axios from "axios";
import EditMenuItem from "./EditMenuItem";

const MenuList = () => {
  const [plats, setPlats] = useState([]);
  const [error, setError] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const fetchPlats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://backend-fastapi-cvi0.onrender.com/menu/mes-plats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlats(response.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des plats.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Confirmer la suppression du plat ?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://backend-fastapi-cvi0.onrender.com/menu/supprimer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPlats(); // 🔁 Rafraîchit la liste après suppression
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du plat.");
    }
  };

  useEffect(() => {
    fetchPlats();
  }, []);

  return (
    <div className="container">
      <h2>Mon Menu</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {plats.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description} - {item.price}€
            <br />
            <button onClick={() => setEditItemId(item.id)}>Modifier</button>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px", color: "red" }}>
              Supprimer
            </button>

            {editItemId === item.id && (
              <EditMenuItem
                item={item}
                onClose={() => setEditItemId(null)}
                onUpdate={fetchPlats}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
