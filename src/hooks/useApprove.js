import { useEffect, useState } from "react"

const useApprove = user =>{
    const [approve, setApprove] = useState(false)
    useEffect( () =>{
    const email = user?.email;
    console.log(email)
    if(email){
        fetch(`http://localhost:5000/approve/${email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res =>res.json())
        .then(data =>{
            setApprove(data.approve);
        })
    }
    },[user])
    return[approve]
}
export default useApprove 