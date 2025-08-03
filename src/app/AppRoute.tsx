import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FooterPage from "../components/Footer_page";
import ServicesPage from "../pages/ServicesPage";
import Reservation_Page from "../pages/Reservation_Page";
import PartnerSection from "../pages/PartnerSection";
import AproposContact from "../pages/AproposContact";
import PolicyPage from "./PolicyPage";
import ConfirmedPartner from "../pages/ConfirmedPartner";
import Dashboard from "../screens/Dashboard";
import SuccessPage from "../pages/SuccessPage";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import Home_Page from "../pages/Home_Page";
import NotFound from "../components/NotFound";
import { JSX, ReactNode } from "react";

// Type definition for props
interface RouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: RouteProps) {
  const { user, token } = useAuth();
  return user && token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: RouteProps) {
  const { user, token } = useAuth();
  return user && token && user.role === "admin" ? children : <Navigate to="/" />;
}

function AppRoute(): JSX.Element {
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Reservation_Page />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home_Page />
            </PrivateRoute>
          }
        />
        <Route
          path="/service"
          element={
            <PrivateRoute>
              <ServicesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/partner"
          element={
          
              <PartnerSection />
           
          }
        />
        <Route
          path="/appropos"
          element={
            <PrivateRoute>
              <AproposContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/policy"
          element={
            <PrivateRoute>
              <PolicyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirmed"
          element={
            <PrivateRoute>
              <ConfirmedPartner />
            </PrivateRoute>
          }
        />
        <Route
          path="/success"
          element={
            <PrivateRoute>
              <SuccessPage />
            </PrivateRoute>
          }
        />

        {/* Admin-only Route */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isAuthenticated && <FooterPage />}
    </Router>
  );
}

export default AppRoute;
