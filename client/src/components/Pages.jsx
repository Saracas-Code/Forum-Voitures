import Inscriptions from "./Inscriptions";
import Forum from "./PagePrincipale";
import ForumPrive from "./ForumPrive";

const Pages = ({ activePage }) => {
    if (activePage === "inscriptions") return <Inscriptions />;
    if (activePage === "private") return <ForumPrive />;
    if (activePage === "profile") return <Profile />;
    return <Forum />; // por defecto, foro público
};

export default Pages;
