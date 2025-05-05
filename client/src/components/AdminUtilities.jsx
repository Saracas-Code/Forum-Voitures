import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.webp";  

const AdminUtilities = ({ onChangeView }) => {
const [isAdmin, setIsAdmin] = useState(false);
const [forumPrivé, setForumPrivé] = useState(false);

useEffect(() => {
    axios.get("http://localhost:3000/api/isLogged", { withCredentials: true })
        .then((res) => {
        console.log("isLogged:", res.data.logged);
        console.log("role:", res.data.role); 
        
        if (res.data.logged && res.data.role === "admin") {
            console.log("ERES UN ADMIN, VAS A VER LOS BOTONCINES")
            setIsAdmin(true);
        }
        })
        .catch(() => setIsAdmin(false));
    }, []);

    if (!isAdmin) { return  ;}

/*
return (
<div className="admin-utilities">
    <button onClick={() => onChangeView("inscriptions")}>
        Inscriptions
    </button>

    <button onClick={() => {
        setForumPrivé(prev => !prev);
        onChangeView(forumPrivé ? "public" : "private");
    }}>
        {forumPrivé ? "Forum public" : "Forum privé"}
    </button>
</div>
);
};
*/

    return (
        <div id="connect">
            <button>Inscriptions</button>
            <button>Forum privé</button>
        </div>
    );
};

export default AdminUtilities;
