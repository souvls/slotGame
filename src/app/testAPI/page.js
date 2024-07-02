"use client"
import React, { useEffect, useState } from 'react';

function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/hello',{method:'POST'})
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return <div>{data ? data.message : 'Loading...'}</div>;
}

export default MyComponent;