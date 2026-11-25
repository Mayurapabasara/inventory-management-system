import React, { useState } from 'react'
import axios from 'axios'

export default function Item() {

  const [item, setItem] = useState({
    itemName: '',
    itemCategory: '',
    itemDetails: '',
    itemImage: ''
  })

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageName = '';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/inventory/itemImg', formData);

        imageName = response.data;
        
        if (imageName.startsWith('error')) {
          throw new Error('Image upload failed');
        }
      }

      await axios.post('http://localhost:8080/inventory', {
        ...item,
        itemImage: imageName
      });

      alert('Item added successfully');
      window.location.href = '/';

    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };




  return (
    <div>
      <div>
        <h1> Add Inventory Item </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Item Name:</label>
            <input type="text" name="itemName" value={item.itemName} onChange={handleChange} required />
          </div>

          <div>
            <label>Item Category:</label>
            <input type="text" name="itemCategory" value={item.itemCategory} onChange={handleChange} required />
          </div>

          <div>
            <label>Item Description:</label>
            <textarea name="itemDetails" value={item.itemDetails} onChange={handleChange} required />
          </div>

          <div>
            <label>Item Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit">Add Item</button>
          <button type="button" onClick={() => window.location.href = '/'}>Cancel</button>
        </form>
      </div>
    </div>
  )
}
