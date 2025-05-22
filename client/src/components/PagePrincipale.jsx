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
    try {
        const res = await axios.get("http://localhost:3000/api/users/pending-count", {
        withCredentials: true
        });
        setPendingCount(res.data.count);
    } catch (err) {
        console.error("Erreur lors du comptage des inscriptions:", err);
    }
    };

    useEffect(() => {
    if (currentUser?.role === "admin") {
        fetchPendingCount();
    }
    }, [currentUser]);

    // Appliquer dark theme au body si nous sommes dans le forum privé ou dans les inscriptions
    useEffect(() => {
        if (isPrivateView || showInscriptions) {
            document.documentElement.classList.add("dark-mode");
            setCurrentLogo(logoPrivate);
        } else {
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
                    currentUser={currentUser}
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
