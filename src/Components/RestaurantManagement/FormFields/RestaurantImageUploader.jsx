import React from 'react';
import getImageUrl from '../../../GenericFunctions/getImageUrl';

const RestaurantImageUploader = ({ 
    editMode, 
    existingImageUrl, 
    imageFile, 
    onImageChange, 
    errors, 
    loading 
}) => {
    return (
        <div className="form-section">
            <h3 className="section-title">Restaurant Details</h3>
            
            <div className="form-group">
                <label className="form-label">
                    {editMode ? 'Update Restaurant Image' : 'Upload Restaurant Image'}
                </label>
                
                {/* Show existing image in edit mode */}
                {editMode && existingImageUrl && !imageFile && (
                    <div className="existing-image-container">
                        <p className="existing-image-label">Current Image:</p>
                        <div className="image-preview">
                            <img 
                                src={getImageUrl(existingImageUrl)} 
                                alt="Current Restaurant" 
                                className="preview-image"
                            />
                        </div>
                    </div>
                )}
                
                <div className="file-upload-wrapper">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onImageChange} 
                        disabled={loading}
                        className="file-input"
                        id="restaurant-image"
                    />
                    <label htmlFor="restaurant-image" className="file-upload-label">
                        <span className="upload-icon">📷</span>
                        <span className="upload-text">
                            {imageFile 
                                ? imageFile.name 
                                : editMode 
                                    ? "Choose new image (optional)" 
                                    : "Choose restaurant image"
                            }
                        </span>
                    </label>
                </div>
                
                {/* Show new image preview */}
                {imageFile && (
                    <div className="file-info">
                        <span className="file-icon">✅</span>
                        <span className="file-name">New Image: {imageFile.name}</span>
                        <div className="image-preview">
                            <img 
                                src={URL.createObjectURL(imageFile)} 
                                alt="New Restaurant Preview" 
                                className="preview-image"
                            />
                        </div>
                    </div>
                )}
                {errors.image && <div className="error-message">{errors.image}</div>}
            </div>
        </div>
    );
};

export default RestaurantImageUploader;