import { useEffect, useState } from "react"

const useUser = user => {
    const [roleUser, setRoleUser] = useState(false)
    useEffect(() => {
        const email = user?.email;
        // console.log(email)
        if (email) {
            fetch(`https://stockmanagementsystemserver-production.up.railway.app/roleUser/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRoleUser(data.roleUser);
                })
        }
    }, [user])
    return [roleUser]
}
export default useUser 