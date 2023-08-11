import { lazy, Suspense } from 'react'
import Container from '@mui/material/Container'
import { createBrowserRouter, Navigate, Outlet, redirect, RouterProvider } from 'react-router-dom'
import routes from './routes.mapping'
import PageLoader from './loaders/PageLoader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCustomer from './state/customer'
import useStoreSelection from './state/selection'
import routesMapping from './routes.mapping'


// Global layout to center content
const GlobalLayout = () => (
  <Container maxWidth="sm" sx={{ background: "background", boxSizing: "border-box" }}>
    <Outlet />
  </Container>
)

// Pages
const HomePage = lazy(() => import("@/pages/Home"))
const ConfirmRoutes = lazy(() => import("@/pages/ConfirmRoutes"))
const Landing = lazy(() => import("@/pages/Landing"))
const Payments = lazy(() => import("@/pages/Paymentstatus"))
const Userinfo = lazy(() => import('@/pages/Userinfo'))
const RestaurantHome = lazy(() => import("@/pages/RestaurantHome"))
const FAQs = lazy(() => import("@/pages/FAQ"))
const ContactInfo = lazy(() => import("@/pages/ContactInfo"))
const ConfirmSelection = lazy(() => import("@/pages/v2/ConfirmSelection"))
const PaymentOptions = lazy(() => import("@/pages/PaymentOptions"))
const Paymentresponse = lazy(() => import("@/pages/PayementResponse"))
const OrderDetail = lazy(() => import("@/pages/OrderDetail"))
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"))
const CustomerOrderdetail = lazy(() => import("@/pages/CustomerOrderdeatil"))
const RateOrder = lazy(() => import("@/pages/ReviewOrder"))
const Notifications = lazy(() => import("@/pages/Notifications"))
const NotFound = lazy(() => import("@/pages/404"))

const routeLoader = () => {
  const { coordinates, routeId } = useCustomer.getState()
  const items = useStoreSelection.getState().items
  if (!routeId || Object.keys(coordinates)?.length === 0) {
    return redirect(routesMapping[404])
  }
  else if (Object.keys(coordinates)?.length > 0 && !!routeId && items.length === 0) {
    return redirect(routesMapping.LANDING)
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: routes.HOMEPAGE,
        element: <HomePage />
      },
      {
        path: routes.CONFIRM_ROUTES,
        element: <ConfirmRoutes />
      },
      {
        path: routes.LANDING,
        element: <Landing />,
      },
      {
        path: routes.RESTAURANT_HOME,
        element: <RestaurantHome />
      },
      {
        path: routes.FAQ,
        element: <FAQs />,
      },
      {
        path: routes.CONTACT_INFO,
        element: <ContactInfo />,
        loader: routeLoader,
      },
      {
        path: routes.CONFIRM_SELECTION,
        element: <ConfirmSelection />,
        // loader: routeLoader,
      },
      {
        path: routes.ORDER_DETAIL,
        element: <OrderDetail />,
      },
      {
        path: routes.PAYMENT_OPTIONS,
        element: <PaymentOptions />,
        // loader: routeLoader,
      },
      {
        path: routes.PAYMENTS,
        element: <Payments />,
      },
      {
        path: routes.PAYMENT_RESPONSE,
        element: <Paymentresponse />,
      },
      {
        path: routes.ORDER_CONFIRMATION,
        element: <OrderConfirmation />,
        // loader: () => {
        //   const { coordinates, routeId } = useCustomer.getState()
        //   if (!routeId || Object.keys(coordinates)?.length === 0) {
        //     return redirect(routesMapping[404])
        //   }
        //   return null
        // }
      },
      {
        path: routes.USER_INFO,
        element: <Userinfo />
      },
      {
        path: routes.CUSTOME_ORDER_INFO,
        element: <CustomerOrderdetail />
      },
      {
        path: routes.RATE_ORDER,
        element: <RateOrder />
      },
      {
        path: routes.NOTIFICATIONS,
        element: <Notifications />
      },
      {
        path: routes[404],
        element: <NotFound />
      },
      {
        path: "*",
        element: <Navigate to={routes[404]} replace />
      }
    ]
  }
])

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
      />
    </Suspense>
  )
}

export default App
