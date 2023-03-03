import { useEffect, useState } from "react"

const useInventory = user => {
    const [inventory, setInventory] = useState(false)
    useEffect(() => {
        const email = user?.email;
        // console.log(email)
        if (email) {
            fetch(`http://localhost:5000/inventory/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setInventory(data.inventory);
                })
        }
    }, [user])
    return [inventory]
}
export default useInventory 