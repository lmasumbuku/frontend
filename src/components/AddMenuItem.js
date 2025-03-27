import React, { useState } from "react";
import axios from "axios";

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/menu/add", {
        name,
        description,
        price: parseFloat(price)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("✅ Plat ajouté avec succès !");
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout du plat.");
    }
  };

  return (
    <div>
      <h2>Ajouter un plat</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        /><br />
        <button type="submit">Ajouter</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddMenuItem;
