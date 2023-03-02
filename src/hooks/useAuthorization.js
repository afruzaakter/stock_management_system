import { useEffect, useState } from "react"

const useAuthorization = user => {
    const [authorization, setAuthorization] = useState(false)
    useEffect(() => {
        const email = user?.email;
        // console.log(email)
        if (email) {
            fetch(`https://stockmanagementsystemserver-production.up.railway.app/authorization/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAuthorization(data.authorization);
                })
        }
    }, [user])
    return [authorization]
}
export default useAuthorization 