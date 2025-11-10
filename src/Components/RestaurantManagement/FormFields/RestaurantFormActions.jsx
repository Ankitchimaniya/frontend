import React from 'react';

const RestaurantFormActions = ({ 
    editMode, 
    loading, 
    onCancel, 
    onReset, 
    uploadProgress, 
    errors, 
    message 
}) => {
    return (
        <div className="space-y-4">
            {/* Upload Progress */}
            {uploadProgress && (
                <div className="upload-progress">
                    <span className="progress-icon">⏳</span>
                    {uploadProgress}
                </div>
            )}

            {/* Error Messages */}
            {errors.server && (
                <div className="server-error">
                    <span className="error-icon">⚠️</span>
                    {errors.server}
                </div>
            )}

            {/* Action Buttons */}
            <div className="form-actions">
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            {editMode ? 'Updating Restaurant...' : 'Adding Restaurant...'}
                        </>
                    ) : (
                        <>
                            <span className="btn-icon">{editMode ? '💾' : '✨'}</span>
                            {editMode ? 'Update Restaurant' : 'Add Restaurant'}
                        </>
                    )}
                </button>
                
                {editMode ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="btn btn-secondary"
                    >
                        <span className="btn-icon">❌</span>
                        Cancel
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={loading}
                        className="btn btn-secondary"
                    >
                        <span className="btn-icon">🔄</span>
                        Reset Form
                    </button>
                )}
            </div>

            {/* Success Message */}
            {message && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <span className="text-green-600 text-xl mr-2">🎉</span>
                        <span className="text-green-700 font-medium">{message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantFormActions;