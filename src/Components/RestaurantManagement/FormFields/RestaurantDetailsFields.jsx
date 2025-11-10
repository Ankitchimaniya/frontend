import React from 'react';

const RestaurantDetailsFields = ({ form, errors, loading, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="form-label">Special Offer</label>
                <div className="input-wrapper">
                    <span className="input-icon">🏷️</span>
                    <input
                        name="offer"
                        value={form.offer}
                        onChange={onChange}
                        disabled={loading}
                        className="form-input"
                        placeholder="e.g. 20% OFF, Free Delivery, etc."
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="section-title">Rating & Delivery Information</h3>
                
                <div className="form-row">
                    <div className="form-group rating-group">
                        <label className="form-label">Rating (0-5)</label>
                        <div className="input-wrapper">
                            <span className="input-icon">⭐</span>
                            <input
                                name="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={form.rating}
                                onChange={onChange}
                                disabled={loading}
                                className={`form-input rating-input ${errors.rating ? 'error' : ''}`}
                                placeholder="4.5"
                            />
                        </div>
                        {errors.rating && <div className="error-message">{errors.rating}</div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Min Delivery Time (minutes)</label>
                        <div className="input-wrapper">
                            <span className="input-icon">⏰</span>
                            <input 
                                name="minDeliveryTime"
                                type="number"
                                min="0"
                                value={form.minDeliveryTime}
                                onChange={onChange}
                                disabled={loading}
                                className={`form-input ${errors.minDeliveryTime ? 'error' : ''}`}
                                placeholder="20"
                            />
                        </div>
                        {errors.minDeliveryTime && <div className="error-message">{errors.minDeliveryTime}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Max Delivery Time (minutes)</label>
                        <div className="input-wrapper">
                            <span className="input-icon">⏱️</span>
                            <input 
                                name="maxDeliveryTime"
                                type="number"
                                min="0"
                                value={form.maxDeliveryTime}
                                onChange={onChange}
                                disabled={loading}
                                className={`form-input ${errors.maxDeliveryTime ? 'error' : ''}`}
                                placeholder="45"
                            />
                        </div>
                        {errors.maxDeliveryTime && <div className="error-message">{errors.maxDeliveryTime}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetailsFields;