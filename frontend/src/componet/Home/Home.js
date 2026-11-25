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
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><img src={item.itemImage} alt={item.name} width="100" height="100" /></td>
                <td>{item.itemName}</td>
                <td>{item.itemCategory}</td>
                <td>{item.itemDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>


        <button onClick={() => (window.location.href='/addItem')}>Add Item</button>



    </div>
  )
}
