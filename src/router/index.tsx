import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import {
    HomePage,
    CellPhonesPage,
    AboutPage,
    BlogPage,
    CellPhonePage,
    LoginPage,
    PostDetailPage,
    DashboardBlogPage,
    RegisterPage,
    OrdersUserPage,
    DashboardPostFormPage,
    CheckoutPage,
    ThankyouPage,
    OrderUserPage,
    DashboardProductsPage,
    DashboardNewProductPage,
    DashboardProductSlugPage,
    DashboardOrdersPage,
    DashboardOrderPage,
    DashboardTaxonomiesPage,
} from '../pages';
import { ClientLayout } from '../layouts/ClientLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            // --- Rutas Públicas Principales ---
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'tienda',
                element: <CellPhonesPage />,
            },
            {
                path: 'producto/:slug',
                element: <CellPhonePage />,
            },
            {
                path: 'nosotros',
                element: <AboutPage />,
            },

            // --- Rutas Públicas del Blog (Agrupadas) ---
            {
                path: 'blog', // Esta es la ruta PÚBLICA para que los clientes vean el blog
                element: <BlogPage />,
            },
             {
                path: 'blog/:slug', // Esta es la ruta PÚBLICA para que los clientes vean el blog
                element: <PostDetailPage />,
            },


            // --- Rutas de Autenticación y Cuentas de Usuario ---
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'registro',
                element: <RegisterPage />,
            },
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='/account/pedidos' replace />,
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />,
                    },
                    {
                        path: 'pedidos/:id',
                        element: <OrderUserPage />,
                    },
                ],
            },
        ],
    },
    // --- Rutas de Flujo de Compra (Checkout) ---
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankyouPage />,
    },
    // --- Rutas del Panel de Administrador ---
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/productos' replace />,
            },
            {
                path: 'productos',
                element: <DashboardProductsPage />,
            },
            {
                path: 'productos/new',
                element: <DashboardNewProductPage />,
            },
            {
                path: 'productos/editar/:slug',
                element: <DashboardProductSlugPage />,
            },
            {
                path: 'ordenes',
                element: <DashboardOrdersPage />,
            },
            {
                path: 'ordenes/:id',
                element: <DashboardOrderPage />,
            },
            {
                path: 'taxonomias',
                element: <DashboardTaxonomiesPage />,
            },
            // --- AÑADIMOS LAS RUTAS DEL BLOG DE ADMIN AQUÍ ---
            {
                path: 'blog',
                element: <DashboardBlogPage />,
            },
            {
                path: 'blog/nuevo',
                element: <DashboardPostFormPage />,
            },
            {
                path: 'blog/editar/:postId',
                element: <DashboardPostFormPage />,
            },
        ],
    },
]);