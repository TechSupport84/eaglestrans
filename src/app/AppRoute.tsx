import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ConfirmedPartner from "../pages/ConfirmedPartner";
import Dashboard from "../screens/Dashboard";
import SuccessPage from "../pages/SuccessPage";

function AppRoute() {
  const { user, loading } = useAuth(); 

  if (loading) return <p className="text-center text-2xl text-blue-800">Loading...</p>;

  return (
    <Router>
      {user && <NavBar />}
      
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Welcome_page />}
        />
        
        <Route
          path="/home"
          element={user ? <Home_Page /> : <Navigate to="/" />}
        />

        {user && (
          <>
            <Route path="/service" element={<ServicesPage />} />
            <Route path="/reservation" element={<Reservation_Page />} />
            <Route path="/partner" element={<PartnerSection />} />
            <Route path="/appropos" element={<AproposContact />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/confirmed" element={<ConfirmedPartner/>}/>
            <Route path="/success"element = {<SuccessPage/>}/>

            {user.role  ==="admin" &&(
              <Route path="/dashboard" element ={<Dashboard/>}/>
            )}
          </>
        )}
      </Routes>

      {user && <FooterPage />}
    </Router>
  );
}

export default AppRoute;
