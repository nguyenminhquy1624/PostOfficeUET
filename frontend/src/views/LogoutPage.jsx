import { useEffect } from "react"
import axios from "axios"
const LogoutPage = () => {
    useEffect(() => {
        const logoutfunc = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/account/logout/',
                    {
                        'jwt': localStorage.getItem('access_token')
                    })
                localStorage.clear()
                console.log("logout data: ", response.data)
            } catch (err) {
                console.log("logout err: ", err)
            }
        }
        logoutfunc()
    }, [])

    return (
        <div></div>
    )
}
export default LogoutPage