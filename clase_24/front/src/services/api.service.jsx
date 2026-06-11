import { useNavigate } from "react-router";
import { useToken } from "../contexts/SessionContext";

export function useApi() {
    const token = useToken()
    const navigate = useNavigate()

    const call = (uri, method, body) => {
        return fetch("http://localhost:2026/api" + uri, {
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