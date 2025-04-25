import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantProfile = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Gestion des erreurs
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({});  // Formulaire pour mettre à jour les données

  const restaurateurId = localStorage.getItem('restaurateur_id'); // Récupère l'ID du restaurateur depuis le localStorage

  useEffect(() => {
    if (restaurateurId) {
      // Récupérer les données du restaurant depuis l'API
      axios
        .get(`https://backend-fastapi-cvi0.onrender.com/restaurant/${restaurateurId}`)
        .then((response) => {
          setRestaurantData(response.data);
          setFormData(response.data);  // Initialiser les données du formulaire avec les données du restaurant
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données du restaurant:', error);
          setError("Impossible de récupérer les données du restaurant.");
          setLoading(false);
        });
    } else {
      setError("ID restaurateur introuvable.");
      setLoading(false);
    }
  }, [restaurateurId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      await axios.put(`https://backend-fastapi-cvi0.onrender.com/restaurant/${restaurateurId}`, formData);
      setSuccessMessage("✅ Profil mis à jour avec succès !");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du profil.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!restaurantData) {
    return <div>Impossible de récupérer les données du restaurant.</div>;
  }

  return (
    <div>
      <h1>Modifier Mon Profil</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nom du restaurant</label>
          <input
            type="text"
            name="nom_restaurant"
            value={formData.nom_restaurant || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Nom du représentant</label>
          <input
            type="text"
            name="nom_representant"
            value={formData.nom_representant || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Prénom du représentant</label>
          <input
            type="text"
            name="prenom_representant"
            value={formData.prenom_representant || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Adresse postale</label>
          <input
            type="text"
            name="adresse_postale"
            value={formData.adresse_postale || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Numéro de ligne vocale</label>
          <input
            type="text"
            name="numero_appel"
            value={formData.numero_appel || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default RestaurantProfile;
