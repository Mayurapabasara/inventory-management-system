import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateItem() {

    //etrieve parameters from the current URL
    const { id } = useParams();

    const navigate = useNavigate();

    const [item, setItem] = useState({
        itemName: '',
        itemCategory: '',
        itemDetails: '',
        itemImage: ''
    });

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    // Load existing inventory item
    useEffect(() => {

        const loadItem = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:8080/inventory/${id}`
                );

                setItem(result.data);
                setLoading(false);

            } catch (error) {
                console.error(error);
                alert('Failed to load item');
                navigate('/');
            }
        };

        loadItem();

    }, [id, navigate]);

    // Handle text input changes
    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    // Handle image selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Update inventory item
    const handleSubmit = async (e) => {

        e.preventDefault();
        setSaving(true);

        try {

            let imageName = item.itemImage;

            // Upload a new image if selected
            if (file) {

                const formData = new FormData();

                formData.append('file', file);

                const response = await axios.post(
                    'http://localhost:8080/inventory/itemImg',
                    formData
                );

                imageName = response.data;

                if (imageName.startsWith('error')) {
                    throw new Error('Image upload failed');
                }
            }

            // Update inventory details
            await axios.put(
                `http://localhost:8080/inventory/${id}`,
                {
                    ...item,
                    itemImage: imageName
                }
            );

            alert('Item updated successfully!');

            navigate('/');

        } catch (error) {

            console.error(error);
            alert('Failed to update item');

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p>Loading item...</p>;
    }

    return (

        <div className="page page-form">

            <div className="update-container">

                <h1 className="update-title">
                    Update Inventory Item
                </h1>

                <form onSubmit={handleSubmit} className="form-card">

                    {/* Item Name */}
                    <div>
                        <label >
                            Item Name
                        </label>

                        <input
                            type="text"
                            name="itemName"
                            value={item.itemName}
                            onChange={handleChange}
                            
                            required
                        />
                    </div>

                    {/* Item Category */}
                    <div>
                        <label >
                            Item Category
                        </label>

                        <input
                            type="text"
                            name="itemCategory"
                            value={item.itemCategory}
                            onChange={handleChange}
                            
                            required
                        />
                    </div>

                    {/* Item Details */}
                    <div>
                        <label >
                            Item Details
                        </label>

                        <textarea
                            name="itemDetails"
                            value={item.itemDetails}
                            onChange={handleChange}
                            rows="4"
                            
                            required
                        />
                    </div>

                    {/* Current Image */}
                    <div>
                        <label >
                            Current Image
                        </label>

                        {item.itemImage && (
                            <img
                                src={`http://localhost:8080/upload/${encodeURIComponent(item.itemImage)}`}
                                alt={item.itemName}
                                className="current-image"
                            />
                        )}
                    </div>

                    {/* New Image */}
                    <div>
                        <label >
                            Change Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            
                        />

                        <p className="form-hint">
                            Leave empty to keep the current image.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="submit"
                            disabled={saving}
                            className="button button-primary"
                        >
                            {saving ? 'Updating...' : 'Update Item'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="button button-secondary"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}