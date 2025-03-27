import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://backend-fastapi-cvi0.onrender.com/orders/mes-commandes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Mes Commandes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Commande #{order.id} - {order.status} - {order.items.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
