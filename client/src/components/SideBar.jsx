import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaUser, FaSignOutAlt, FaInfoCircle, FaClipboardList, FaUserLock, FaIdBadge, FaArrowLeft, FaUsers, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

function SideBar({ currentUser, setCurrentUser, setIsPrivateView, isPrivateView, showProfile, setShowProfile, showUserList, setShowUserList, showInscriptions, setShowInscriptions, pendingCount, refetchPendingCount }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      setIsPrivateView(false); // ← volver a tema claro
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  };

  return (
    <div className="sidebar">
      <ul className="menu-content">
        {/* Login user */}
        <li>
          <FaUser />
          <span className="menu-label">
            {currentUser ? `${currentUser.login}` : "Undefined"}
          </span>
        </li>

        {/* Email user */}
        <li className="menu-item">
          <div className="menu-label-wrapper">
            <FaEnvelope />
            <span className="menu-label">Email</span>
          </div>
          <div className="menu-description">
            {currentUser?.email || "Pas de email"}
          </div>
        </li>

        {/* Voir d'autres profiles */}
        {!showInscriptions && (
          <li onClick={() => {
            if (showUserList) {
              setShowUserList(false);
            } else {
              setShowUserList(true);
            }
            setShowProfile(false);
            setIsPrivateView(false);
          }}>
            {showUserList ? <FaArrowLeft /> : <FaUsers />}
            <span className="menu-label">
              {showUserList ? "Retour au forum" : "Découvrir personnes"}
            </span>
          </li>
        )}

        {/* ADMIN OPTIONS */}
        {currentUser?.role === "admin" && !showProfile && !showUserList && (
          <>
            {/* Inscriptions */}
            <li onClick={() => {
              setShowInscriptions(prev => !prev);
              setShowUserList(false);
              setShowProfile(false);
              setIsPrivateView(false);
            }}>
              {showInscriptions ? <FaArrowLeft /> : <FaClipboardList />}
              <span className="menu-label">
                {showInscriptions ? "Retour au forum" : `Inscriptions${pendingCount > 0 ? ` (${pendingCount})` : ""}`}
              </span>
            </li>

            {/* Forum privé / publique */}
            {!showInscriptions && (
              <li onClick={() => setIsPrivateView(prev => !prev)}>
                <FaUserLock />
                <span className="menu-label">
                  {isPrivateView ? "Forum public" : "Forum privé"}
                </span>
              </li>
            )}
          </>
        )}
      </ul>

      {/* Profile */}
      <ul className="bottom-container">
        {!showInscriptions && (
          <li onClick={() => {
            if (showProfile) {
              setShowProfile(false);     // Retourner au forum
            } else {
              setShowProfile(true);
            }
            setShowUserList(false);
            setIsPrivateView(false);
          }}>
            {showProfile ? <FaArrowLeft /> : <FaIdBadge />}
            <span className="menu-label">
              {showProfile ? "Retour au forum" : "Voir profil"}
            </span>
          </li>
        )}

        {/* Logout */}
        <li onClick={handleLogout}>
          <FaSignOutAlt />
          <span className="menu-label">Déconnexion</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
