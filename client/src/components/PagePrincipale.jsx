import { Link } from "react-router-dom";
import "../styles/PagePrincipale.css";
import logo from "../assets/logo.webp";  
import SideBar from "./SideBar";
import Forum from "./Forum";

const PagePrincipale = ({ currentUser, setCurrentUser }) => {
    return (
        <div className="page-layout">
            <SideBar currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <div className="main-section">
                <header>
                    <div id="logo">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div id="search">
                        <label htmlFor="date_search">Recherche</label>
                        <div className="chps_recherche">
                            <input id="auteur" type="text" placeholder="Auteur..." />
                            <input id="mot_cle" type="text" placeholder="Mot-clé..." />
                            <input id="initial_date" type="date" />
                            <input id="final_date" type="date" />
                        </div>
                        <button type="submit">Search</button>
                    </div>

                </header>
                {/* AQUI IRÁ EL FORUM */}
                <main>
                    <Forum currentUser={currentUser} />
                </main>
            </div>
        </div>
    );
};

export default PagePrincipale;
