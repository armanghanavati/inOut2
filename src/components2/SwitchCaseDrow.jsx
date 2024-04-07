import React, { useState, useEffect } from 'react';


const SwitchCaseDrow = () => {
    const [isActive, setIsActive] = useState(false);
    const [switchWidth, setSwitchWidth] = useState(60);
    const [switchHeight, setSwitchHeight] = useState(30);
    const [handleSize, setHandleSize] = useState(26);

    useEffect(() => {
        const handleResize = () => {
            // Adjust switch size for phones
            if (window.innerWidth <= 600) {
                setSwitchWidth(40);
                setSwitchHeight(20);
                setHandleSize(16);
            } else {
                setSwitchWidth(60);
                setSwitchHeight(30);
                setHandleSize(26);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSwitch = () => {
        setIsActive(!isActive);
    };

    return (
        <div
            className={`switch ${isActive ? 'active' : ''}`}
            style={{ width: switchWidth, height: switchHeight }}
            onClick={toggleSwitch}
        >
            <div
                className="switch-handle"
                style={{ width: handleSize, height: handleSize }}
            ></div>
        </div>
    );
};

export default SwitchCaseDrow;
