import { useEffect, useState } from "react"

const useAdmin = user =>{
    const [admin, setAdmin] = useState(false)
    useEffect( () =>{
    const email = user?.email;
    // console.log(email)
    if(email){
        fetch(`https://stockmanagementsystemserver-production.up.railway.app/admin/${email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res =>res.json())
        .then(data =>{
            setAdmin(data.admin);
        })
    }
    },[user])
    return[admin]
}
export default useAdmin 