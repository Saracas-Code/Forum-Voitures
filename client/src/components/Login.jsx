import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'

import "../styles/forms.css"
import "../styles/Login.css"

const Login = ({ currentUser, setCurrentUser }) => {

    const [showPassword, setShowPassword] = useState(false);

    // States pour les inputs et le message d'erreur
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Pour rédiriger après le login

    // Fonction pour vérifier l'authentification
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!login || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/login", {
                login,
                password
            }, {
                withCredentials: true
            });

            if (response.status === 200 && response.data.user) {
                setCurrentUser(response.data.user); 
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Erreur de connexion, veuillez réessayer.");
            }
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate("/forum");
        }
    }, [currentUser, navigate]);


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
