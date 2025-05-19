import React, { useState } from "react";
import axios from "axios";

const EditMenuItem = ({ item, onClose, onUpdate }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !description || isNaN(price) || price <= 0) {
      setError("Veuillez remplir tous les champs correctement.");
      return;
    }

    setIsSubmitting(true); // Désactive le bouton de soumission pendant l'envoi
    setError(""); // Réinitialise l'erreur

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://backend-fastapi-cvi0.onrender.com/menu/modifier/${item.id}`,
        {
          name,
          description,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(); // Recharger la liste des plats
      onClose(); // Fermer le formulaire de modification
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du plat.");
    } finally {
      setIsSubmitting(false); // Réactive le bouton de soumission
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "10px", borderRadius: "8px" }}>
      <h4>Modifier le plat</h4>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Nom du plat :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: "8px", borderRadius: "4px" }}
          />
        </label>

        <label>
          Description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: "8px", borderRadius: "4px" }}
          />
        </label>

        <label>
          Prix :
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
            style={{ padding: "8px", borderRadius: "4px" }}
          />
        </label>

        <button type="submit" disabled={isSubmitting} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
          {isSubmitting ? "Mise à jour..." : "Valider"}
        </button>
        <button type="button" onClick={onClose} style={{ padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
          Annuler
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default EditMenuItem;
