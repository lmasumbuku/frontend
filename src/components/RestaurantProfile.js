import React, { useEffect, useState } from 'react';

const RestaurantProfile = ({ restaurantId }) => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    fetch(`/restaurants/${restaurantId}`)  // Modifie selon ton endpoint
      .then(response => response.json())
      .then(data => setRestaurantData(data))
      .catch(error => console.error("Error fetching restaurant data: ", error));
  }, [restaurantId]);

  if (!restaurantData) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.description}</p>
      {/* Ajoute d'autres informations comme le menu, etc. */}
    </div>
  );
};

export default RestaurantProfile;
