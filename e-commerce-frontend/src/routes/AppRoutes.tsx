import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import { AppRoute } from './RoutesEnum';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import MyAccountPage from '../pages/MyAccountPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={AppRoute.HOME} element={<HomePage />} />
            <Route path={AppRoute.LOGIN} element={<LoginPage />} />
            <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
            <Route path={AppRoute.CREATE_PRODUCT} element={<ProductCreatePage />} />
            <Route path={AppRoute.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
            <Route path={AppRoute.MY_ACCOUNT} element={<MyAccountPage />} />

            <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
