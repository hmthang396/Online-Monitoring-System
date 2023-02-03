import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const history = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) history("/auth/login");
    }, [history]);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;