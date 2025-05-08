import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
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
  const { user } = useAuth();

  return (
    <Router>
      {user && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authenticated Routes */}
        {user ? (
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
        ) : (
          <Route path="*" element={<NotFound />} />
        )}

        {/* Admin Route */}
      {user && user.role === "admin" &&(<Route path="/dashboard" element={<Dashboard />} />)}

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {user && <FooterPage />}
    </Router>
  );
}

export default AppRoute;
