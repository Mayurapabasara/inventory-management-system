import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Item.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const emptyItem = { itemName: '', itemCategory: '', itemDetails: '' };

export default function Item() {
  const [item, setItem] = useState(emptyItem);
  const [image, setImage] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      let itemImage = '';
      if (image) {
        const data = new FormData();
        data.append('file', image);
        const upload = await fetch(`${API_URL}/inventory/itemImg`, { method: 'POST', body: data });
        if (!upload.ok) throw new Error('The image could not be uploaded.');
        itemImage = await upload.text();
        if (itemImage === `error${image.name}`) throw new Error('The image could not be uploaded.');
      }

      const response = await fetch(`${API_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, itemImage }),
      });
      if (!response.ok) throw new Error('The item could not be saved.');
      setItem(emptyItem);
      setImage(null);
      setFileKey((key) => key + 1);
      setMessage({ type: 'success', text: 'Item added successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message === 'Failed to fetch' ? 'Unable to connect to the server. Please try again.' : error.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="item-page">
      <div className="item-container">
        <Link className="item-back" to="/">← Back to home</Link>
        <header className="item-heading">
          <span className="item-eyebrow">INVENTORY MANAGEMENT</span>
          <h1>Add a new item</h1>
          <p>Keep your inventory organized with the details that matter.</p>
        </header>

        <form className="item-form" onSubmit={handleSubmit}>
          <div className="item-section-heading">
            <div><h2>Item information</h2><p>Enter the details for your new inventory item.</p></div>
            <span className="item-id">ID generated automatically</span>
          </div>

          <div className="item-grid">
            <div className="item-field">
              <label htmlFor="itemName">Item name <span>*</span></label>
              <input id="itemName" name="itemName" value={item.itemName} onChange={handleChange} placeholder="e.g. Wireless keyboard" required />
            </div>
            <div className="item-field">
              <label htmlFor="itemCategory">Category <span>*</span></label>
              <input id="itemCategory" name="itemCategory" value={item.itemCategory} onChange={handleChange} placeholder="e.g. Electronics" required />
            </div>
            <div className="item-field item-field-wide">
              <label htmlFor="itemDetails">Item details <span>*</span></label>
              <textarea id="itemDetails" name="itemDetails" value={item.itemDetails} onChange={handleChange} placeholder="Add a description, specifications, or other useful details..." rows="5" required />
            </div>
            <div className="item-field item-field-wide">
              <label htmlFor="itemImage">Item image <span className="item-optional">Optional</span></label>
              <div className="item-upload">
                <span className="item-upload-icon" aria-hidden="true">↑</span>
                <div><strong>Choose an image</strong><p>Add a photo to help identify this item.</p></div>
                <input key={fileKey} id="itemImage" type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0] || null)} />
              </div>
            </div>
          </div>

          {message && <p className={`item-message ${message.type}`} role="status">{message.text}</p>}
          <div className="item-actions">
            <Link className="item-cancel" to="/">Cancel</Link>
            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add item'} <span aria-hidden="true">→</span></button>
          </div>
        </form>
        <p className="item-footer">Fields marked with <span>*</span> are required.</p>
      </div>
    </main>
  );
}
