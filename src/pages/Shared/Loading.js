import React from 'react';

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center ">
            <div className="w-16 h-16 border-b-2 border-red-800 rounded-full animate-spin">
            </div>
        </div>
    );
};

export default Loading;