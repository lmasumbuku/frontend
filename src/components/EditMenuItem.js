import React, { useState } from "react";
import axios from "axios";

const EditMenuItem = ({ item, onClose, onUpdate }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://backend-fastapi-cvi0.onrender.com/menu/modifier/${item.id}`, {
        name,
        description,
        price: parseFloat(price),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      onUpdate(); // pour recharger les plats
      onClose(); // pour fermer le formulaire
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du plat.");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
      <h4>Modifier le plat</h4>
      <form onSubmit={handleUpdate}>
        <input value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} /><br />
        <button type="submit">Valider</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditMenuItem;
