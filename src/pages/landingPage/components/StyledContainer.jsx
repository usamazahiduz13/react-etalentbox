import React from 'react';

const StyledContainer = ({ className = '', children }) => {
    return (
        <div className={`container mx-auto px-4 w-full xl:max-w-7xl 2xl:max-w-[1536px] ${className}`}>
            {children}
        </div>
    );
};

export default StyledContainer; 