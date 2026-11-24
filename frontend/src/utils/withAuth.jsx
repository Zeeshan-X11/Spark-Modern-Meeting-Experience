import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const isAuthenticated = () => Boolean(localStorage.getItem("token"));

const withAuth = (WrappedComponent ) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        useEffect(() => {
            if(!isAuthenticated()) {
                router("/auth")
            }
        }, [router])

        return <WrappedComponent {...props} />
    }

    return AuthComponent;
}

export default withAuth;