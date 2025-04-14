import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantProfile = () => {
  const [form, setForm] = useState({
    username: "",
    nom_restaurant: "",
    nom_representant: "",
    prenom_representant: "",
    adresse_postale: "",
    email: "",
    numero_appel: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const restaurateurId = localStorage.getItem("restaurateur_id"); // à adapter selon ton auth

  // Récupération des données actuelles
  useEffect(() => {
    axios
      .get(`https://backend-fastapi-cvi0.onrender.com/restaurant/${restaurateurId}`)
      .then((res) => {
        setForm(res.data);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://backend-fastapi-cvi0.onrender.com/restaurant/${restaurateurId}`, form);
      setSuccess("Profil mis à jour avec succès ✅");
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-xl font-bold mb-4">Mon Profil Restaurateur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "username", label: "Nom d'utilisateur" },
          { name: "nom_restaurant", label: "Nom du restaurant" },
          { name: "nom_representant", label: "Nom du représentant" },
          { name: "prenom_representant", label: "Prénom du représentant" },
          { name: "adresse_postale", label: "Adresse postale" },
          { name: "email", label: "Email" },
          { name: "numero_appel", label: "Numéro de ligne vocale" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required={field.name !== "adresse_postale"}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>

        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default RestaurantProfile;
