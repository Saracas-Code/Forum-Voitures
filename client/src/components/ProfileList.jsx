import ProfileView from "./ProfileView";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileList = ({ currentUser, setShowProfile, setShowUserList }) => {
    const [users, setUsers] = useState([]);
    const [roleChange, setRoleChange] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3000/api/users?validated=true", { withCredentials: true })
        .then(res => setUsers(res.data))
        .catch(err => console.error("Erreur lors du chargement des utilisateurs:", err));
    }, []);

    const handleRoleChange = (userId, newRole) => {
        setUsers(prevUsers =>
            prevUsers.map(u =>
                u._id === userId ? { ...u, role: newRole } : u
            )
        );
    };

    return (
        <div className="profile-list-container">
            <h2>Découvrir les membres</h2>
                <div className="profile-cards">
                    {users
                    .filter(u => u.login !== currentUser.login)
                    .map(user => (
                        <ProfileView key={user.login} user={user} currentUser={currentUser} onRoleChange={handleRoleChange} />
                    ))}
                </div>
        </div>
    );
};

export default ProfileList;
