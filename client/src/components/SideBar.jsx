import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Sidebar.css";
import { FaUser, FaSignOutAlt, FaInfoCircle, FaClipboardList, FaUserLock, FaIdBadge } from "react-icons/fa";
import axios from "axios";

function SideBar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Description de l'utilisateur connecté :", currentUser?.description);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  };

  return (
    <div className="sidebar">
      <ul className="menu-content">
        <li>
          <FaUser />
          <span className="menu-label">{currentUser?.prenom} {currentUser?.nom}</span>
        </li>

        <li className="menu-item">
          <div className="menu-label-wrapper">
            <FaInfoCircle />
            <span className="menu-label">Description</span>
          </div>
          <div className="menu-description">
            {currentUser?.description || "Pas de description"}
          </div>
        </li>

        {/* ADMIN OPTIONS */}
        {currentUser?.role === "admin" && (
          <>
            <li>
              <FaClipboardList />
              <span className="menu-label">Inscriptions</span>
            </li>
            <li>
              <FaUserLock />
              <span className="menu-label">Forum privé</span>
            </li>
          </>
        )}
      </ul>

      {/* Logout and profile fixed at bottom */}
      <ul className="bottom-container">
        <li>
          <FaIdBadge />
          <span className="menu-label">Voir profil</span>
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt />
          <span className="menu-label">Déconnexion</span>
        </li>
      </ul>

    </div>
  );
}

export default SideBar;
