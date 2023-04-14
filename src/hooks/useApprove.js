import { useEffect, useState } from "react"

const useApprove = user => {
    const [approve, setApprove] = useState(false)
    useEffect(() => {
        const email = user?.email;
        // console.log(email)
        if (email) {
            fetch(`https://stock-management-system-server.vercel.app/approve/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setApprove(data.approve);
                })
        }
    }, [user])
    return [approve]
}
export default useApprove 