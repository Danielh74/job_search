import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken") ? true : false);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [userToken, setUserToken] = useState();
    const [users, setUsers] = useState();

    const fetchUsers = async () => {
        const config = localStorage.getItem("userToken")
            ? { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
            : {};
        try {
            const response = await axios.get(
                "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/a3dea4e1-45c5-41da-9a30-3351a1116941/",
                config
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            fetchUsers();
            setLoggedInUser(jwtDecode(localStorage.getItem("userToken")));

        }
    }, [])


    const changeLogin = (option) => {
        setIsLoggedIn(option);
    }

    const changeLoggedInUser = (data) => {
        setLoggedInUser(data);

    }

    const getUserToken = (t) => {
        setUserToken(t);
    }


    return <LoginContext.Provider value={{ isLoggedIn, changeLogin, loggedInUser, setLoggedInUser, changeLoggedInUser, userToken, getUserToken, users, setUsers }}>{children}</LoginContext.Provider>;
}
