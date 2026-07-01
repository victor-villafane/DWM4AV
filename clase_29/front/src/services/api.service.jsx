import { useNavigate } from "react-router";
import { useToken } from "../contexts/SessionContext";

export function useApi() {
    const token = useToken()
    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_API_URL

    const call = (uri, method, body) => {
        return fetch(baseUrl + uri, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.status >= 400) navigate("/logout")
                return res.json()
            })
    }

    return { call }
}