import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import { AppRoute } from '../routes/RoutesEnum';
import { useLogout } from '../hooks/AuthHooks';
import { useAuth } from '../services/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useLogout();
    const { role, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await logoutHandler();
        navigate(AppRoute.LOGIN);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">E-Commerce</Link>
            </div>
            <div className="navbar-links">
                {!isAuthenticated ? (
                    <>
                        <Link to={AppRoute.LOGIN}>Login</Link>
                        <Link to={AppRoute.REGISTER}>Register</Link>
                    </>
                ) : (
                    <>
                        {role === 'Admin' && (
                            <Link to={AppRoute.CREATE_PRODUCT}>Create Product</Link>
                        )}
                        <Link to={AppRoute.MY_ACCOUNT}>My Account</Link>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
