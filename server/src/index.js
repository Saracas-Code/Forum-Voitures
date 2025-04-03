
const app = require('./app.js');

const port = 8000;
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost: ${port}`);
});
