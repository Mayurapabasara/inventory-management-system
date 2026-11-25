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

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">

                <h1 className="text-2xl font-bold mb-6">
                    Update Inventory Item
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Item Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Item Name
                        </label>

                        <input
                            type="text"
                            name="itemName"
                            value={item.itemName}
                            onChange={handleChange}
                            className="w-full border rounded-md p-3"
                            required
                        />
                    </div>

                    {/* Item Category */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Item Category
                        </label>

                        <input
                            type="text"
                            name="itemCategory"
                            value={item.itemCategory}
                            onChange={handleChange}
                            className="w-full border rounded-md p-3"
                            required
                        />
                    </div>

                    {/* Item Details */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Item Details
                        </label>

                        <textarea
                            name="itemDetails"
                            value={item.itemDetails}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border rounded-md p-3"
                            required
                        />
                    </div>

                    {/* Current Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Current Image
                        </label>

                        {item.itemImage && (
                            <img
                                src={`http://localhost:8080/upload/${encodeURIComponent(item.itemImage)}`}
                                alt={item.itemName}
                                className="w-32 h-32 object-contain border rounded-md"
                            />
                        )}
                    </div>

                    {/* New Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Change Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border rounded-md p-3"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            Leave empty to keep the current image.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-md"
                        >
                            {saving ? 'Updating...' : 'Update Item'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-md"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}