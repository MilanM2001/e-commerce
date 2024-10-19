import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import { AppRoute } from './RoutesEnum';
import NotFoundPage from '../pages/NotFoundPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import MyAccountPage from '../pages/MyAccountPage';
import CartPage from '../pages/CartPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import AdminRoutesOutlet from './AdminRoutesOutlet';
import AuthRoutesOutlet from './AuthRoutesOutlet';
import NoAuthRoutesOutlet from './NoAuthRoutesOutlet';

const AppRoutes = () => {
    return (
        <Routes>

            /* Routes both authenticated and non authenticated users can access */
            <Route path={AppRoute.HOME} element={<HomePage />} />
            <Route path={AppRoute.PRODUCT_DETAILS} element={<ProductDetailsPage />} />

            /* Routes which authenticated users cannot access */
            <Route element={<NoAuthRoutesOutlet />}>
                <Route path={AppRoute.LOGIN} element={<LoginPage />} />
                <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
            </Route>

            /* Routes all authenticated users can access */
            <Route element={<AuthRoutesOutlet />}>
                <Route path={AppRoute.MY_ACCOUNT} element={<MyAccountPage />} />
                <Route path={AppRoute.CART} element={<CartPage />} />
            </Route>

            /* Routes only users with role "admin" can access */
            <Route element={<AdminRoutesOutlet />}>
                <Route path={AppRoute.CREATE_PRODUCT} element={<ProductCreatePage />} />
                <Route path={AppRoute.UPDATE_PRODUCT} element={<ProductUpdatePage />} />
            </Route>

            <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
