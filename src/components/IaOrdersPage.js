import React, { useEffect, useState } from "react";
import axios from "axios";

function IaOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://backend-fastapi-cvi0.onrender.com/mes-commandes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>Commandes passées par l’IA</h2>
      {loading ? (
        <p>Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>ID :</strong> {order.id} <br />
              <strong>Plats :</strong> {order.items.join(", ")} <br />
              <strong>Statut :</strong> {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IaOrdersPage;
