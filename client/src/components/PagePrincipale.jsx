import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/PagePrincipale.css";
import logoPublic from "../assets/Forum-Voitures-Light.png";  
import logoPrivate from "../assets/Forum-Voitures-Dark.png";  
import SideBar from "./SideBar";
import Forum from "./Forum";
import Recherche from "./Recherche"

const PagePrincipale = ({ currentUser, setCurrentUser }) => {
    const [isPrivateView, setIsPrivateView] = useState(false);
    const [filters, setFilters] = useState({});

    // Appliquer thème global au body
    useEffect(() => {
        if (isPrivateView) {
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isPrivateView]);

    const currentLogo = isPrivateView ? logoPrivate : logoPublic;

    return (
        <div className="page-layout">
            <SideBar 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                setIsPrivateView={setIsPrivateView}
                isPrivateView={isPrivateView} />

            <div className="main-section">
                <header>
                    <div id="logo">
                        <img src={currentLogo} alt="Logo" />
                    </div>
                    <Recherche onSearch={setFilters} />
                </header>
                <main>
                    <Forum 
                        currentUser={currentUser} 
                        isPrivateView={isPrivateView}
                        filters={filters} />
                </main>
            </div>
        </div>
    );
};

export default PagePrincipale;
