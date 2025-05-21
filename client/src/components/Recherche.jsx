import { useState } from "react";
import "../styles/Recherche.css";

const Recherche = ({ onSearch }) => {
    const [author, setAuthor] = useState("");
    const [keyword, setKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = () => {
        onSearch({ author, keyword, startDate, endDate });
    };

    const handleReset = () => {
        setAuthor("");
        setKeyword("");
        setStartDate("");
        setEndDate("");
        onSearch({}); // Limpia los filtros en el padre
    };

    return (
        <div id="search">
        <label>Recherche</label>
        <div className="chps_recherche">
            <input type="text" placeholder="Auteur..." value={author} onChange={e => setAuthor(e.target.value)} />
            <input type="text" placeholder="Mot-clé..." value={keyword} onChange={e => setKeyword(e.target.value)} />
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={handleSearch}>Chercher</button>
            <button onClick={handleReset}>Réinitialiser</button> 
        </div>
        </div>
    );
};

export default Recherche;
