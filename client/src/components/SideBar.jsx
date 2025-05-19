import { useNavigate } from "react-router-dom";
import axios from "axios";

function SideBar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  };

  return (
    <div className="sidebar">
      <h3>Bienvenue, {currentUser?.prenom} {currentUser?.nom}</h3>
      <p>Login: {currentUser?.login}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default SideBar;
