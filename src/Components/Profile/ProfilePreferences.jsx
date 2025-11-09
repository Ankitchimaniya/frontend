import React from 'react';
import { MdNotifications, MdSms } from 'react-icons/md';
import { FaGlobe } from 'react-icons/fa';

const ProfilePreferences = ({ profile, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaGlobe className="mr-2 text-primary-500" />
                Preferences
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language
                </label>
                <select
                    name="preferredLanguage"
                    value={profile.preferredLanguage || 'English'}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="English">English</option>
                    <option value="Hindi">हिंदी (Hindi)</option>
                    <option value="Bengali">বাংলা (Bengali)</option>
                    <option value="Telugu">తెలుగు (Telugu)</option>
                    <option value="Marathi">मराठी (Marathi)</option>
                    <option value="Tamil">தமிழ் (Tamil)</option>
                    <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                    <option value="Malayalam">മലയാളം (Malayalam)</option>
                    <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                </select>
            </div>

            <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-800">Notification Preferences</h4>
                
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={profile.emailNotifications}
                        onChange={onChange}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="emailNotifications" className="ml-3 text-sm text-gray-700 flex items-center">
                        <MdNotifications className="mr-2 text-gray-500" />
                        Email Notifications
                    </label>
                </div>
                
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="smsNotifications"
                        name="smsNotifications"
                        checked={profile.smsNotifications}
                        onChange={onChange}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="smsNotifications" className="ml-3 text-sm text-gray-700 flex items-center">
                        <MdSms className="mr-2 text-gray-500" />
                        SMS Notifications
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProfilePreferences;