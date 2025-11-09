import React from 'react';
import Alert from './Alert';

const AlertContainer = ({ alerts, removeAlert }) => {
    if (!alerts || alerts.length === 0) return null;

    return (
        <>
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    isVisible={alert.isVisible}
                    message={alert.message}
                    type={alert.type}
                    duration={0} // Duration is handled by the hook
                    position={alert.position}
                    onClose={() => removeAlert(alert.id)}
                />
            ))}
        </>
    );
};

export default AlertContainer;