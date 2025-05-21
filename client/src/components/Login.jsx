import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'

import "../styles/forms.css"
import "../styles/Login.css"

const Login = ({ setCurrentUser }) => {

    const [showPassword, setShowPassword] = useState(false);

    // States pour les inputs et le message d'erreur
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Pour rédiriger après le login

    // Fonction pour vérifier l'authentification
    const handleSubmit = async (event) => {
        event.preventDefault(); // Éviter que la page se recharge

        if (!login || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // DEMANDE À LA DATABASE SI L'USER EXISTE OU PAS.
        try {
            // Request avec axios
            const response = await axios.post("http://localhost:3000/api/login", 
            // Body
            {
                login: login,
                password: password
            },
            // Config de petition
            {
                withCredentials: true // cookies
            });

            // Si la réponse est bonne, on va au forum
            if (response.status === 200) {
                const isLoggedResponse = await axios.get("http://localhost:3000/api/isLogged", {
                    withCredentials: true
                });

                if(isLoggedResponse.data.logged) {
                    setCurrentUser(isLoggedResponse.data.user); // UPDATE CURRENT USER
                    navigate("/forum");
                }
            }
        } catch (err) {
            // S'il y a quelque erreur, afficher le message
            if (err.response) {
                // Si el error es de la respuesta del servidor
                setError(err.response.data.message);
            } else {
                setError("Erreur de connexion, veuillez réessayer.");
            }
        }
    };

    const handleReset = () => {
        setLogin("");
        setPassword("");
        setError("");
    };

    return (
        <div className="login-container">
            <h1>Ouvrir une session</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>

                <label htmlFor="chp_login">Login</label>
                <input id="chp_login" placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)} />

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

                <button type="reset">Annuler</button>
                <button type="submit">Connexion</button>

                {error && <p className="error">{error}</p>}
            </form>
            <div id="connect">
                <label htmlFor="info-register">Vous n'avez pas une compte?</label>
                <Link to="/register">Enregistrement</Link>
            </div>
        </div>
    );
};

export default Login;
