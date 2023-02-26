import { useEffect, useState } from "react"

const useStore = user => {
    const [store, setStore] = useState(false)
    useEffect(() => {
        const email = user?.email;
        // console.log(email)
        if (email) {
            fetch(`http://localhost:5000/store/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setStore(data.store);
                })
        }
    }, [user])
    return [store]
}
export default useStore 