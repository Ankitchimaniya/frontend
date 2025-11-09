import React from 'react';
import { FaSave } from 'react-icons/fa';

const SubmitButton = ({ saving, onSubmit }) => {
    return (
        <div className="pt-6 border-t border-gray-200">
            <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {saving ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                    </>
                ) : (
                    <>
                        <FaSave className="mr-2" />
                        Save Profile
                    </>
                )}
            </button>
        </div>
    );
};

export default SubmitButton;