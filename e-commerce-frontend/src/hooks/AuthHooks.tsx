import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest, RegisterRequest } from "../model/auth";
import { login, register } from "../services/AuthService";
import { useAuth } from "../services/AuthContext";

const useLogin = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { login: loginContext } = useAuth();
    const navigate = useNavigate();

    const loginHandler = async (loginData: LoginRequest) => {
        try {
            setIsLoading(true);
            const data = await login(loginData);
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;
            await loginContext(accessToken, refreshToken);
            navigate("/");
        } catch (error: any) {
            if (error.response && (error.response.status === 403 || error.response.status === 401 || error.response.status === 404)) {
                setErrorMessage('Username or Password incorrect');
            }
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { loginHandler, loading, error, errorMessage };
};

const useLogout = () => {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logout: logoutContext } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            logoutContext();
            navigate("/login");
        } catch (error: any) {
            setError(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { logoutHandler, loading, error };
};

const useRegister = () => {
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const registerHandler = async (registerData: RegisterRequest) => {
        try {
            setIsLoading(true)
            await register(registerData)
            navigate("/login")
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("Username taken")
            }
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { registerHandler, loading, error, errorMessage }
}

export { useLogin, useLogout, useRegister }