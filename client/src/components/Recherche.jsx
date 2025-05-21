import { useState } from "react";

function Recherche({ onSearch }) {
    const [filters, setFilters] = useState({
        auteur: false,
        motCle: false,
        dateDebut: false,
        dateFin: false,
    });

    const [values, setValues] = useState({
        auteur: "",
        motCle: "",
        dateDebut: "",
        dateFin: "",
    });

    const toggleFilter = (filterName) => {
        setFilters({ ...filters, [filterName]: !filters[filterName] });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(values);
    };

    return (
        <div className="search-container">
            <h2>Recherche</h2>

            <div className="filter-selectors">
                <label><input type="checkbox" onChange={() => toggleFilter("auteur")} /> Auteur</label>
                <label><input type="checkbox" onChange={() => toggleFilter("motCle")} /> Mot-clé</label>
                <label><input type="checkbox" onChange={() => toggleFilter("dateDebut")} /> Date début</label>
                <label><input type="checkbox" onChange={() => toggleFilter("dateFin")} /> Date fin</label>
            </div>

            <form className="chp_recherche" onSubmit={handleSubmit}>
                {filters.auteur && <input type="text" name="auteur" placeholder="Auteur..." onChange={handleChange} />}
                {filters.motCle && <input type="text" name="motCle" placeholder="Mot-clé..." onChange={handleChange} />}
                {filters.dateDebut && <input type="date" name="dateDebut" onChange={handleChange} />}
                {filters.dateFin && <input type="date" name="dateFin" onChange={handleChange} />}

                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Recherche;

// LUEOG EN PAGINA PRINCIPAL:

import Recherche from "./Recherche";

const handleSearch = (filtros) => {
    console.log("Filtros aplicados:", filtros);
    // Puedes enviar estos filtros al backend o usarlos para filtrar mensajes
};

<Recherche onSearch={handleSearch} />
