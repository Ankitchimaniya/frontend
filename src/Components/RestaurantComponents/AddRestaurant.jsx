import React, { useState, useEffect } from "react";
import { FaTimes, FaStore, FaEdit } from "react-icons/fa";
import apiClient from "../../services/apiClient";

// Import Restaurant components
import BasicInformationFields from "../Restaurant/BasicInformationFields";
import CuisineSelector from "../Restaurant/CuisineSelector";
import RestaurantDetailsFields from "../Restaurant/RestaurantDetailsFields";
import RestaurantImageUploader from "../Restaurant/RestaurantImageUploader";
import RestaurantFormHeader from "../Restaurant/RestaurantFormHeader";
import RestaurantFormActions from "../Restaurant/RestaurantFormActions";

/**
 * AddRestaurant.jsx
 *
 * Reusable Add/Edit Restaurant form component.
 *
 * Props:
 * - endpoint (string) - API endpoint to POST the restaurant data. Default: "/api/restaurants"
 * - onSuccess (function) - optional callback called with created restaurant data on success
 * - editMode (boolean) - true for edit mode, false for add mode
 * - restaurantId (number) - ID of restaurant to edit (required when editMode is true)
 * - initialData (object) - initial form data for editing
 * - onCancel (function) - callback for cancel action
 *
 * Usage:
 * <AddRestaurant endpoint="/api/restaurants" onSuccess={r => console.log(r)} />
 * <AddRestaurant editMode={true} restaurantId={123} initialData={data} onSuccess={r => console.log(r)} />
 */

export default function AddRestaurant({ 
    onSuccess, 
    editMode = false, 
    restaurantId = null, 
    initialData = {}, 
    onCancel 
}) {
    const [form, setForm] = useState({
        title: initialData.title || "",
        offer: initialData.offer || "",
        rating: initialData.rating || "",
        minDeliveryTime: initialData.minDeliveryTime || "",
        maxDeliveryTime: initialData.maxDeliveryTime || "",
        cuisine: initialData.cuisine || "",
        location: initialData.location || "",
    });
    const [selectedCuisines, setSelectedCuisines] = useState(
        initialData.cuisine ? initialData.cuisine.split(',').map(c => c.trim()) : []
    );
    const [imageFile, setImageFile] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(initialData.imageUrl || "");
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
   
    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try { 
                const response = await apiClient.get('/Catagory/GetCatagories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
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
        };
        fetchCategories();
    }, []);

    // Update form when initialData changes (for edit mode)
    React.useEffect(() => {
        if (editMode && initialData) {
            setForm({
                title: initialData.title || "",
                offer: initialData.offer || "",
                rating: initialData.rating || "",
                minDeliveryTime: initialData.minDeliveryTime || "",
                maxDeliveryTime: initialData.maxDeliveryTime || "",
                cuisine: initialData.cuisine || "",
                location: initialData.location || "",
            });
            setSelectedCuisines(
                initialData.cuisine ? initialData.cuisine.split(',').map(c => c.trim()) : []
            );
            setExistingImageUrl(initialData.imageUrl || "");
        }
    }, [editMode, initialData]);

    const validate = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setMessage("");
    };

    const handleCuisineChange = (cuisine) => {
        setSelectedCuisines(prev => {
            let newCuisines;
            if (prev.includes(cuisine)) {
                // Remove if already selected
                newCuisines = prev.filter(c => c !== cuisine);
            } else {
                // Add if not selected
                newCuisines = [...prev, cuisine];
            }
            
            // Update form with comma-separated string
            const cuisineString = newCuisines.join(', ');
            setForm(f => ({ ...f, cuisine: cuisineString }));
            setErrors(prev => ({ ...prev, cuisine: undefined }));
            setMessage("");
            
            return newCuisines;
        });
    };

    const handleFile = (e) => {
        const file = e.target.files && e.target.files[0];
        setImageFile(file || null);
        setMessage("");
        // Clear any existing errors
        setErrors((prev) => ({ ...prev, image: undefined }));
    };

    const handleImageChange = handleFile; // Alias for compatibility with Restaurant components

    const handleReset = () => {
        setForm({
            title: "",
            offer: "",
            rating: "",
            minDeliveryTime: "",
            maxDeliveryTime: "",
            cuisine: "",
            location: "",
        });
        setSelectedCuisines([]);
        setImageFile(null);
        setExistingImageUrl("");
        setUploadProgress("");
        setErrors({});
        setMessage("");
    };
      

    const uploadImage = async () => {
        if (!imageFile) return "";
        
        setUploadProgress("📤 Uploading image...");
        try {
            const imageFormData = new FormData();
            imageFormData.append("file", imageFile);

            const imageRes = await apiClient.post("/Images/Upload", imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setUploadProgress("✅ Image uploaded successfully!");
            
            // Return the image URL (adjust based on your API response structure)
            return imageRes.data.imageUrl || imageRes.data.url || imageRes.data.filePath || "";
        } catch (error) {
            setUploadProgress("");
            setErrors({ image: error.response?.data?.message || "Failed to upload image" });
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        setMessage("");
        const validationErrors = validate(); 
        
        if (Object.keys(validationErrors).length) { 
            setErrors(validationErrors);
            return;
        }
 
        setLoading(true);
        try {
            let imageUrl = existingImageUrl; // Use existing image URL by default
            
            // Step 1: Upload new image if provided
            if (imageFile) {
                imageUrl = await uploadImage();
                setUploadProgress(editMode ? "🏪 Updating restaurant details..." : "🏪 Adding restaurant details...");
            } else {
                setUploadProgress(editMode ? "🏪 Updating restaurant..." : "🏪 Adding restaurant...");
            }
            
            // Step 2: Add or Update restaurant with image URL
            const apiUrl = editMode 
                ? `/RestaurantDetails/${restaurantId}`
                : "/RestaurantDetails";
            
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

            const res = editMode 
                ? await apiClient.put(`/RestaurantDetails/${restaurantId}`, requestBody)
                : await apiClient.post("/RestaurantDetails", requestBody);

            const data = res.data;
            setUploadProgress("");
            setMessage(editMode ? "🎉 Restaurant updated successfully!" : "🎉 Restaurant added successfully!");
            
            // Call onSuccess callback if provided
            if (onSuccess && data) {
                onSuccess(data);
            }
            
            if (!editMode) {
                // Reset form only in add mode
                setForm({
                    title: "",
                    offer: "",
                    rating: "",
                    minDeliveryTime: "",
                    maxDeliveryTime: "",
                    cuisine: "",
                    location: "",
                });
                setSelectedCuisines([]);
                setImageFile(null);
                setExistingImageUrl("");
            }
            setErrors({});
        } catch (err) {
            setUploadProgress("");
            setErrors({ server: err.message || "Network error" });
            setMessage(editMode ? "❌ Failed to update restaurant." : "❌ Failed to add restaurant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <RestaurantFormHeader 
                editMode={editMode}
                onCancel={onCancel}
                loading={loading}
            />

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                <BasicInformationFields 
                    form={form}
                    errors={errors}
                    loading={loading}
                    onChange={handleChange}
                />

                <CuisineSelector 
                    selectedCuisines={selectedCuisines}
                    onCuisineChange={handleCuisineChange}
                    categories={categories}
                    errors={errors}
                    loading={loading}
                />

                <RestaurantImageUploader 
                    editMode={editMode}
                    existingImageUrl={existingImageUrl}
                    imageFile={imageFile}
                    onImageChange={handleImageChange}
                    errors={errors}
                    loading={loading}
                />

                <RestaurantDetailsFields 
                    form={form}
                    errors={errors}
                    loading={loading}
                    onChange={handleChange}
                />

                <RestaurantFormActions 
                    editMode={editMode}
                    loading={loading}
                    onCancel={onCancel}
                    onReset={handleReset}
                    uploadProgress={uploadProgress}
                    errors={errors}
                    message={message}
                />
            </form>
        </div>
    );
}