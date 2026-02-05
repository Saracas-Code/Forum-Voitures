import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'

import "../styles/forms.css"
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextInput from "./ui/TextInput";

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

        console.log("[LOGIN] Tentative de connexion avec :", { login });

        if (!login || !password) {
            console.warn("[LOGIN] Champs manquants.");
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

            console.log("[LOGIN] Réponse serveur :", response.data);

            if (response.status === 200 && response.data.user) {
                console.log("[LOGIN] Connexion réussie :", response.data.user.login);
                setCurrentUser(response.data.user); 
            }
        } catch (err) {
            if (err.response) {
                console.error("[LOGIN] Erreur côté serveur :", err.response.data.message);
                setError(err.response.data.message);
            } else {
                console.error("[LOGIN] Erreur réseau ou inconnue :", err.message);
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
        <div className="auth-page">
            <Card className="auth-card">
                <h1>Ouvrir une session</h1>
                <form className="auth-form" onSubmit={handleSubmit} onReset={handleReset}>
                    <TextInput
                        id="chp_login"
                        label="Login"
                        placeholder="Login..."
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />

                    <TextInput
                        id="chp_password"
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        rightSlot={
                            <button
                                type="button"
                                className="ui-icon-button"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        }
                    />

                    <div className="form-actions">
                        <Button type="reset" variant="secondary">Annuler</Button>
                        <Button type="submit" variant="primary">Connexion</Button>
                    </div>
                </form>
                <div className="auth-footer">
                    <span>Vous n'avez pas une compte?</span>
                    <Link to="/register">Enregistrement</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
