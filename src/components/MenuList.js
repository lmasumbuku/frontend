import React, { useState, useEffect } from "react";
import axios from "axios";
import EditMenuItem from "./EditMenuItem";

const MenuList = () => {
  const [plats, setPlats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Récupération des plats
  const fetchPlats = async () => {
    setLoading(true); // Déclenche le chargement
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
    } finally {
      setLoading(false); // Arrêt du chargement
    }
  };

  // Suppression d'un plat
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
    fetchPlats(); // Récupère les plats lors du montage du composant
  }, []);

  return (
    <div className="container">
      <h2>Mon Menu</h2>
      {loading && <p>Chargement des plats...</p>} {/* Affichage du message de chargement */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {plats.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description} - {item.price}€
            <br />
            <button onClick={() => setEditItemId(item.id)}>Modifier</button>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
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
