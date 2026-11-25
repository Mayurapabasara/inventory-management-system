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
    <div>
        <h1>Inventory Items</h1>

        <table border="1" cellPadding="10" cellSpacing="0">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                  Edit
                  </button>

                  <button onClick={() => deleteItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <button onClick={() => (window.location.href='/addItem')}>Add Item</button>



    </div>
  )
}
