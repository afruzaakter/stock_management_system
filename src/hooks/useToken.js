import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useToken= user=>{
    const [token, setToken]=useState('');
    useEffect(()=>{
        const email=user?.user?.email;
        const currentUser = {email:email}
        if(email){
            fetch(`http://localhost:5000/allUsers/${email}`,{
                method:'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=> res.json())
            .then(data=>{
                console.log("inside token", data);
                toast.success("wow! Account Created Successfully! ")
            })
        }


    },[user]);
    return [token];
}
export default useToken;