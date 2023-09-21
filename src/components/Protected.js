import { Navigate } from "react-router-dom";

function Protected({ children }) {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
        return children;
    }

    return <Navigate to={"/"} />
}

export default Protected;