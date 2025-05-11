import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "./NavBar";
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

function AppRoute() {
  const { user, token } = useAuth();

  const isAuthenticated = user && token;

  return (
    <Router>
      {isAuthenticated && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Reservation_Page />} />
            <Route path="/home" element={<Home_Page />} />
            <Route path="/service" element={<ServicesPage />} />
            <Route path="/partner" element={<PartnerSection />} />
            <Route path="/appropos" element={<AproposContact />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/confirmed" element={<ConfirmedPartner />} />
            <Route path="/success" element={<SuccessPage />} />
          </>
        )}

        {/* Admin Route */}
        {isAuthenticated && user.role === "admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isAuthenticated && <FooterPage />}
    </Router>
  );
}

export default AppRoute;
