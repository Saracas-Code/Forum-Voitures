import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "./components/Forum";
import Login from "./components/Login";
import Enregistrement from "./components/Enregistrement";
import './App.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Forum />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Enregistrement />} />
            </Routes>
        </Router>
    );
}

export default App;
