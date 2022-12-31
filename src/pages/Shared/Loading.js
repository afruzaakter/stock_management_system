import React, { useEffect, useState } from 'react';
// import FadeLoader from "react-spinners/FadeLoader";
import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, []);
    return (
        <div className='m-auto h-screen flex justify-center items-center'>
        <HashLoader
             color={'#db2777'}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        {/* <FadeLoader

             color={'#0f766e'}
            loading={loading}
            size={400}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> */}

    </div>
    );
};

export default Loading;