import React, { useState } from "react";
import axios from "axios";

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://backend-fastapi-cvi0.onrender.com/menu/add",
        { name, description, price: parseFloat(price) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Plat ajouté avec succès !");
      setName("");
      setDescription("");
      setPrice("");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l’ajout du plat.");
    }
  };

  return (
    <div>
      <h2>Ajouter un plat au menu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <textarea
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMenuItem;
