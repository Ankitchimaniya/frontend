import { useState } from 'react';
import axios from 'axios';

const useRestaurantService = (showSuccess, showError) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const response = await axios.get('https://localhost:7172/api/Catagory/GetCatagories', { headers });

            if (response.status === 200) {
                setCategories(response.data);
            } else {
                // Fallback categories in case API fails
                setCategories([
                    { id: 1, name: 'Italian' },
                    { id: 2, name: 'Chinese' },
                    { id: 3, name: 'Indian' },
                    { id: 4, name: 'Mexican' },
                    { id: 5, name: 'American' },
                    { id: 6, name: 'Thai' },
                    { id: 7, name: 'Japanese' },
                    { id: 8, name: 'Fast Food' },
                    { id: 9, name: 'Other' }
                ]);
            }
        } catch (error) { 
            // Fallback categories in case of network error
            setCategories([
                { id: 1, name: 'Italian' },
                { id: 2, name: 'Chinese' },
                { id: 3, name: 'Indian' },
                { id: 4, name: 'Mexican' },
                { id: 5, name: 'American' },
                { id: 6, name: 'Thai' },
                { id: 7, name: 'Japanese' },
                { id: 8, name: 'Fast Food' },
                { id: 9, name: 'Other' }
            ]);
        }
    };

    const validate = (form) => {
        const e = {};
        if (!form.title.trim()) e.title = "Restaurant title is required";
        if (!form.location.trim()) e.location = "Location is required";
        if (!form.cuisine.trim()) e.cuisine = "Cuisine is required";
        if (form.rating && (isNaN(Number(form.rating)) || Number(form.rating) < 0 || Number(form.rating) > 5))
            e.rating = "Rating must be a number between 0 and 5";
        if (form.minDeliveryTime && isNaN(Number(form.minDeliveryTime)))
            e.minDeliveryTime = "Min delivery time must be a number";
        if (form.maxDeliveryTime && isNaN(Number(form.maxDeliveryTime)))
            e.maxDeliveryTime = "Max delivery time must be a number";
        if (form.minDeliveryTime && form.maxDeliveryTime && Number(form.minDeliveryTime) > Number(form.maxDeliveryTime))
            e.maxDeliveryTime = "Max delivery time must be greater than min delivery time";
        return e;
    };

    const uploadImage = async (imageFile) => {
        if (!imageFile) return "";
        
        setUploadProgress("📤 Uploading image...");
        try {
            const imageFormData = new FormData();
            imageFormData.append("file", imageFile);

            const imageRes = await axios.post("https://localhost:7172/api/Images/Upload", imageFormData, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (imageRes.status !== 200) {
                const errorText = imageRes.data.message || "Failed to upload image";
                throw new Error(errorText);
            }

            const imageData = imageRes.data;
            setUploadProgress("✅ Image uploaded successfully!");
            
            return imageData.imageUrl || imageData.url || imageData.filePath || "";
        } catch (error) {
            setUploadProgress("");
            throw error;
        }
    };

    const submitRestaurant = async (form, imageFile, editMode, restaurantId, existingImageUrl) => {
        setLoading(true);
        try {
            let imageUrl = existingImageUrl;
            
            // Step 1: Upload new image if provided
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
                setUploadProgress(editMode ? "🏪 Updating restaurant details..." : "🏪 Adding restaurant details...");
            } else {
                setUploadProgress(editMode ? "🏪 Updating restaurant..." : "🏪 Adding restaurant...");
            }
            
            // Step 2: Add or Update restaurant with image URL
            const apiUrl = editMode 
                ? `https://localhost:7172/api/RestaurantDetails/${restaurantId}`
                : "https://localhost:7172/api/RestaurantDetails";
            
            const method = editMode ? "PUT" : "POST"; 
            
            const requestBody = {
                id: editMode ? restaurantId : 0,
                title: form.title,
                imageUrl: imageUrl,
                offer: form.offer,
                rating: form.rating ? Number(form.rating) : 0,
                minDeliveryTime: form.minDeliveryTime ? Number(form.minDeliveryTime) : 0,
                maxDeliveryTime: form.maxDeliveryTime ? Number(form.maxDeliveryTime) : 0,
                cuisine: form.cuisine,
                location: form.location
            };

            const res = await axios(apiUrl, {
                method: method,
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: JSON.stringify(requestBody),
            });

            if (res.status !== 200) {
                const text = res.data;
                let serverErrors = {};
                try {
                    const json = JSON.parse(text);
                    serverErrors = json.errors || { server: json.message || text };
                } catch {
                    serverErrors = { server: text || "Server error" };
                }
                throw new Error(serverErrors.server || 'Failed to submit restaurant');
            } else {
                const data = await res.json().catch(() => null);
                setUploadProgress("");
                showSuccess(editMode ? "🎉 Restaurant updated successfully!" : "🎉 Restaurant added successfully!");
                return data;
            }
        } catch (err) {
            setUploadProgress("");
            showError(err.message || (editMode ? "❌ Failed to update restaurant." : "❌ Failed to add restaurant."));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        uploadProgress,
        fetchCategories,
        validate,
        submitRestaurant
    };
};

export default useRestaurantService;