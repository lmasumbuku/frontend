import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantProfile = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);

  const restaurateurId = localStorage.getItem('restaurateur_id'); // Récupère l'ID du restaurateur depuis le localStorage

  useEffect(() => {
    if (restaurateurId) {
      // Récupérer les données du restaurant depuis l'API
      axios
        .get(`https://backend-fastapi-cvi0.onrender.com/restaurant/${restaurateurId}`)
        .then((response) => {
          setRestaurantData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données du restaurant:', error);
          setLoading(false);
        });
    }
  }, [restaurateurId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!restaurantData) {
    return <div>Impossible de récupérer les données du restaurant.</div>;
  }

  return (
    <div>
      <h1>{restaurantData.nom_restaurant}</h1>
      <p>Nom du représentant: {restaurantData.nom_representant} {restaurantData.prenom_representant}</p>
      <p>Adresse: {restaurantData.adresse_postale}</p>
      <p>Email: {restaurantData.email}</p>
      <p>Numéro de ligne vocale: {restaurantData.numero_appel}</p>
      {/* Ajoute d'autres informations comme le menu, etc. */}
    </div>
  );
};

export default RestaurantProfile;
