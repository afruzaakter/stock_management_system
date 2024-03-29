import { useState, useEffect } from "react";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email }
        if (email) {
            fetch(`https://stock-management-system-server.vercel.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("inside token", data);
                    // const accessToken = data.token;
                    // localStorage.setItem('accessToken', accessToken);
                    setToken(data);
                })
        }

    }, [user]);
    return [token];
}
export default useToken;