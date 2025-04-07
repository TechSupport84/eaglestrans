import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Welcome_page from "../pages/Welcome_page";
import Home_Page from "../pages/Home_Page";
import NavBar from "./NavBar";
import FooterPage from "../components/Footer_page";
import ServicesPage from "../pages/ServicesPage";
import Reservation_Page from "../pages/Reservation_Page";
import PartnerSection from "../pages/PartnerSection";
import AproposContact from "../pages/AproposContact";
import PolicyPage from "./PolicyPage";

function AppRoute() {
  const { user, loading } = useAuth(); 

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {user && <NavBar />}
      <Routes>
        <Route path="/" element={user ? <Home_Page /> : <Welcome_page />} />
        <Route path="/home" element={user ? <Home_Page /> : <Welcome_page />} />
        
        <Route
          path="/service"
          element={user ? <ServicesPage /> : <Welcome_page />}
        />
        <Route
          path="/reservation"
          element={user ? <Reservation_Page /> : <Welcome_page />}
        />
        <Route
          path="/partner"
          element={user ? <PartnerSection /> : <Welcome_page />}
        />
        <Route
          path="/appropos"
          element={user ? <AproposContact /> : <Welcome_page />}
        />
        <Route
          path="/policy"
          element={user ? <PolicyPage /> : <Welcome_page />}
        />
      </Routes>
      {user && <FooterPage />}
    </Router>
  );
}

export default AppRoute;
