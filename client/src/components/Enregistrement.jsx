import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'

import "../styles/forms.css"
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextInput from "./ui/TextInput";

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


    // Fonction pour verifier la registration
    const handleSubmit = (event) => {
        event.preventDefault(); // Eviter le rechargement

        console.log("[ENREGISTREMENT] Formulaire soumis avec :", { prenom, nom, login, email });
    
        if (!prenom || !nom || !login || !email || !password || !retapez) {
            console.warn("[ENREGISTREMENT] Champs manquants");
            setError("Veuillez remplir tous les champs");
            setSuccess("");
            return;
        }
    
        if (password !== retapez) {
            console.warn("[ENREGISTREMENT] Mot de passe non confirme");
            setError("La password n'est pas la meme");
            setSuccess("");
            return;
        }
    
        setSuccess("Inscription reussie! En attente de validation administrative");
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
                console.log("[ENREGISTREMENT] Reponse serveur :", response.data);
                if (response.data.message) {
                    setSuccess(response.data.message);  // Reponse exiteuse => message
                }
            })
            .catch((error) => {
                console.error("[ENREGISTREMENT] Erreur serveur :", error.response?.data || error.message);
                setError(error.response?.data?.message || "Erreur lors de l'inscription");
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
        <div className="auth-page">
            <Card className="auth-card">
                <h1>Enregistrement</h1>
                <form className="auth-form auth-form--two" onSubmit={handleSubmit} onReset={handleReset}>
                    <TextInput
                        id="chp_prenom"
                        label="Prenom"
                        placeholder="Name..."
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                    <TextInput
                        id="chp_nom"
                        label="Nom"
                        placeholder="Surname..."
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <TextInput
                        id="chp_login"
                        label="Login (Username)"
                        placeholder="Login..."
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="form-span-full"
                    />

                    <TextInput
                        id="chp_email"
                        label="Email"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-span-full"
                    />

                    <TextInput
                        id="chp_password"
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        className="form-span-full"
                    />

                    <TextInput
                        id="chp_retapez"
                        label="Retapez le mot de passe"
                        type={showRetapez ? "text" : "password"}
                        placeholder="Repeat password..."
                        value={retapez}
                        onChange={(e) => setRetapez(e.target.value)}
                        error={error}
                        rightSlot={
                            <button
                                type="button"
                                className="ui-icon-button"
                                onClick={() => setShowRetapez(!showRetapez)}
                                title={showRetapez ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                aria-label={showRetapez ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showRetapez ? <FiEyeOff /> : <FiEye />}
                            </button>
                        }
                        className="form-span-full"
                    />

                    <div className="form-actions">
                        <Button type="reset" variant="secondary">Annuler</Button>
                        <Button type="submit" variant="primary">S'inscrire</Button>
                    </div>

                    {success && <p className="ui-success form-message">{success}</p>}
                </form>
                <div className="auth-footer">
                    <span>Vous avez deja une compte?</span>
                    <Link to="/login">Connexion</Link>
                </div>
            </Card>
        </div>
    );
};

export default Enregistrement;
