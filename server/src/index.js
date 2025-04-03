const app = require("./app");
const { connectToDB } = require("./db.js");

const PORT = 3000;

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
});
