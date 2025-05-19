import { Link } from "react-router-dom";
import "../styles/PagePrincipale.css";
import logo from "../assets/logo.webp";  
import AdminUtilities from "./AdminUtilities";
import SideBar from "./SideBar";

const Forum = ({ currentUser, setCurrentUser }) => {
    return (
        <div>
            <header>
                <div id="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div id="search">
                    <label htmlFor="date_search">Zone de recherche</label>
                    <div id="chp_dates">
                        <input id="initial_date" type="date" />
                        <input id="final_date" type="date" />
                    </div>
                    <button type="submit">Search</button>
                </div>
                {/** ADMIN UTILITIES **/}
                <AdminUtilities />
                {/*
                <div id="connect">
                    <AdminUtilities />
                    {
                        <AdminUtilities
                            onToggleForum={handleToggleForum}
                            onShowInscriptions={handleInscriptions}
                            forumPrive={forumPrive}
                        />
                    }
                    {<Link to="/login">Connexion</Link>
                    <Link to="/register">Enregistrement</Link>}
                </div>
                */}
            </header>
            <main>
                <aside>
                    <div className="sidebar">
                        <SideBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    </div>

                </aside>

                <div id="css_container">
                    <section id="nouveau_msg">
                        <div id="new_comment">
                            <input type="text" id="message_input" placeholder="Écrivez votre message ici..." />
                            <button id="add_message">Ajouter</button>
                        </div>
                    </section>

                    <section id="liste_msg">
                        <div className="message">
                            <p className="message-content">
                                Voici un message fictif pour illustrer l'affichage des messages dans la liste.
                            </p>
                            <p className="message-date">Publié le : 30/01/2025</p>
                            <p className="message-owner">Propriétaire : utilisateur1</p>
                            <button className="response-btn">+</button>
                        </div>

                        <div className="message">
                            <p className="message-content">
                                Un autre message fictif avec une réponse possible.
                            </p>
                            <p className="message-date">Publié le : 29/01/2025</p>
                            <p className="message-owner">Propriétaire : utilisateur2</p>
                            <button className="response-btn">+</button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Forum;
