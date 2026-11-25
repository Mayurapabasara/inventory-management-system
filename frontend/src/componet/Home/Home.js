import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/inventory");

    console.log(result.data);
    setItems(result.data);
  };

  const deleteItem = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
        try {
            await axios.delete(
                `http://localhost:8080/inventory/${id}`
            );

            alert("Item deleted successfully!");

            loadItems();

        } catch (error) {
            console.error(error);
            alert("Failed to delete item");
        }
    }
};

  return (
    <main className="page page-wide">
        <header className="page-heading">
          <div><p className="eyebrow">INVENTORY MANAGEMENT</p><h1>Inventory Items</h1><p>View and manage your inventory in one place.</p></div>
          <button className="button button-primary" onClick={() => (window.location.href='/addItem')}>+ Add Item</button>
        </header>
        <div className="table-container">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={`http://localhost:8080/upload/${encodeURIComponent(item.itemImage)}`}
                    alt={item.itemName}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{item.itemName}</td>
                <td>{item.itemCategory}</td>
                <td>{item.itemDetails}</td>

                <td>
                  <button onClick={() => window.location.href = `/updateItem/${item.id}`}
                    className="button button-edit"
                    >
                  Edit
                  </button>

                  <button onClick={() => deleteItem(item.id)}
                    className="button button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        </div>
    </main>
  )
}
