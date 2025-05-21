import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'

import "../styles/forms.css"
import "../styles/Enregistrement.css"

const Enregistrement = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRetapez, setShowRetapez] = useState(false);

    // States pour les inputs et le message d'erreur
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retapez, setRetapez] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Pour rédiriger après le login

    // Fonction pour vérifier la registration
    const handleSubmit = (event) => {
        event.preventDefault(); // Éviter le réchargement
    
        if (!prenom || !nom || !login || !email || !password || !retapez) {
            setError("Veuillez remplir tous les champs");
            setSuccess("");
            return;
        }
    
        if (password !== retapez) {
            setError("La password n'est pas la même");
            setSuccess("");
            return;
        }
    
        setSuccess("Inscription réussie! En attente de validation administrative");
        setError("");
    
        // REQUEST AU SERVEUR POUR AJOUTER L'UTILISATEUR 
        axios
            .post("http://localhost:3000/api/register", 
            // Body
            { 
                prenom,
                nom,
                login,
                email,
                password
            },
            // Config de petition
            {
                withCredentials: true // cookies
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.message) {
                    setSuccess(response.data.message);  // Réponse exiteuse => message
                }
            })
            .catch((error) => {
                console.error(error);
                setError("Erreur lors de l'inscription"); // Réponse mauvaise => erreur
            });
    };
    

    const handleReset = () => {
        setPrenom("");
        setNom("");
        setLogin("");
        setEmail("");
        setPassword("");
        setRetapez("");
        setError("");
        setSuccess("");
    };

    return (
        <div className="enregistrement-container">
            <h1>Enregistrement</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="prenom_nom">
                    <div>
                        <label htmlFor="chp_prenom">Prénom</label>
                        <input id="chp_prenom" placeholder="Name..." value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="chp_nom">Nom</label>
                        <input id="chp_nom" placeholder="Surname..." value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                </div>

                <label htmlFor="chp_login">Login (Username)</label>
                <input id="chp_login" placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)}/>

                <label htmlFor="chp_email">Email</label>
                <input id="chp_email" placeholder="Email..." value={login} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="chp_password">Mot de passe</label>
                <div className="password-toggle">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="chp_password"
                        className="password-input"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                <label htmlFor="chp_retapez">Retapez le mot de passe</label>
                <div className="password-toggle">
                    <input
                        type={showRetapez ? "text" : "password"}
                        id="chp_retapez"
                        className="password-input"
                        placeholder="Repeat password..."
                        value={retapez}
                        onChange={(e) => setRetapez(e.target.value)}
                    />
                    <span
                        className="toggle-icon"
                        onClick={() => setShowRetapez(!showRetapez)}
                        title={showRetapez ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        >
                        {showRetapez ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>

                <button type="reset">Annuler</button>
                <button type="submit">S'inscrire</button>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
            <div id="connect">
                <label htmlFor="info-connexion">Vous avez déjà une compte?</label>
                <Link to="/login">Connexion</Link>
            </div>
        </div>
    );
};

export default Enregistrement;
