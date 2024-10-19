import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { AppRoute } from "./RoutesEnum";

const NoAuthRoutesOutlet: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to={AppRoute.HOME} replace />
    }

    return <Outlet />;
};

export default NoAuthRoutesOutlet;