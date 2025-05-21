import React, { useState } from "react";
import axios from "axios";

const AiOrderSender = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddItem = () => {
    if (item) {
      setItems([...items, item]);
      setItem("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!restaurantId || items.length === 0) {
      setError("Restaurant ID et éléments de commande sont nécessaires.");
      return;
    }

    try {
      const response = await axios.post("https://backend-fastapi-cvi0.onrender.com/orders/ia", {
        restaurant_id: restaurantId,
        items: items,
      });

      setSuccessMessage("✅ Commande envoyée avec succès !");
      setItems([]); // Reset des items après envoi
      setRestaurantId(""); // Reset du restaurant id
    } catch (err) {
      setError("Erreur lors de l'envoi de la commande.");
    }
  };

  return (
    <div className="container">
      <h2>Envoyer une commande par l'IA</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Restaurant ID</label>
          <input
            type="text"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            placeholder="ID du restaurant"
          />
        </div>

        <div>
          <label>Ajouter un plat</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Nom du plat"
          />
          <button type="button" onClick={handleAddItem}>Ajouter Plat</button>
        </div>

        <div>
          <h3>Plats ajoutés</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <button type="submit">Envoyer la commande</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AiOrderSender;

