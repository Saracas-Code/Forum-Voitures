import Inscriptions from "./Inscriptions";
import Forum from "./Forum";
import ForumPrive from "./ForumPrive";

const Pages = ({ activePage }) => {
    if (activePage === "inscriptions") return <Inscriptions />;
    if (activePage === "private") return <ForumPrive />;
    return <Forum />; // por defecto, foro público
};

export default Pages;
