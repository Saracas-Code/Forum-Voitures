import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PagePrincipale.css";
import logoPublic from "../assets/Forum-Voitures-Light.png";  
import logoPrivate from "../assets/Forum-Voitures-Dark.png";  
import SideBar from "./SideBar";
import Forum from "./Forum";
import Recherche from "./Recherche";
import Profile from "./Profile";
import ProfileList from "./ProfileList";
import Inscriptions from "./Inscriptions";

const PagePrincipale = ({ currentUser, setCurrentUser }) => {

    const [filters, setFilters] = useState({});

    const [pendingCount, setPendingCount] = useState(0);

    const [currentLogo, setCurrentLogo] = useState(logoPublic);
    const [isPrivateView, setIsPrivateView] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [showInscriptions, setShowInscriptions] = useState(false);

    const fetchPendingCount = async () => {

        console.log("[PAGE] Récupération du nombre d'inscriptions en attente...");

        try {
            const res = await axios.get("http://localhost:3000/api/users/pending-count", {
            withCredentials: true
            });

            console.log(`[PAGE] Inscriptions en attente : ${res.data.count}`);

            setPendingCount(res.data.count);
        } catch (err) {
            console.error("[PAGE] Erreur lors du comptage des inscriptions :", err.message);
        }
    };

    useEffect(() => {
    if (currentUser?.role === "admin") {
        console.log("[PAGE] Utilisateur admin détecté – chargement du compteur d'inscriptions")
        fetchPendingCount();
    }
    }, [currentUser]);

    // Appliquer dark theme au body si nous sommes dans le forum privé ou dans les inscriptions
    useEffect(() => {
        if (isPrivateView || showInscriptions) {
            console.log("[THÈME] Mode dark activé");
            document.documentElement.classList.add("dark-mode");
            setCurrentLogo(logoPrivate);
        } else {
            console.log("[THÈME] Mode dark desactivé");
            document.documentElement.classList.remove("dark-mode");
            setCurrentLogo(logoPublic);
        }
    }, [isPrivateView, showInscriptions]);


    return (
        <div className="page-layout">
            <SideBar 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                setIsPrivateView={setIsPrivateView}
                isPrivateView={isPrivateView}
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                showUserList={showUserList}
                setShowUserList={setShowUserList}
                showInscriptions={showInscriptions}
                setShowInscriptions={setShowInscriptions}
                pendingCount={pendingCount}
                refetchPendingCount={fetchPendingCount}
            />

            <div className="main-section">
                <header>
                    <div id="logo">
                        <img src={currentLogo} alt="Logo" />
                    </div>
                    <Recherche onSearch={setFilters} />
                </header>
                <main>
                {showInscriptions ? (
                    <Inscriptions 
                    currentUser={currentUser} 
                    refetchPendingCount={fetchPendingCount}
                    />
                ) : showUserList ? (
                    <ProfileList 
                    currentUser={currentUser} 
                    setShowProfile={setShowProfile}
                    setShowUserList={setShowUserList}
                    />
                ) : showProfile ? (
                    <Profile
                    setShowProfile={setShowProfile}
                    />
                ) : (
                    <Forum
                    currentUser={currentUser}
                    isPrivateView={isPrivateView}
                    filters={filters}
                    />
                )}
                </main>
            </div>
        </div>
    );
};

export default PagePrincipale;
