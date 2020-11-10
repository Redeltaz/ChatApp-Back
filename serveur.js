const db = require('./database');
const express = require("express")
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const {
    urlencoded
} = require('body-parser');
const port = 666;

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

app.get('/connexion', (req, res) => {
    res.sendFile(__dirname + '/view/connexion.html')
})

app.get('/inscription', (req, res) => {
    res.sendFile(__dirname + '/view/inscription.html')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/view/chat.html')
})

app.post('/inscription', (req, res) => {
    let user = {
        pseudo: req.body.pseudo,
        mdp: req.body.mdp
    }
    db.query(`INSERT INTO user (pseudo, password) VALUES ('${user.pseudo}', '${user.mdp}')`, (err, result) => {
        if (err) throw err;
        console.log("utilisateur inscrit");
    });
    res.writeHead(302, {
        'Location': '/connexion',
    });
    res.end();
})

app.post('/connexion', (req, res) => {
    let pseudo = req.body.pseudo
    let mdp = req.body.mdp
    db.query(`SELECT * FROM user WHERE pseudo = '${pseudo}' AND password = '${mdp}'`, (err, result) => {
        if (err) throw err;
        if (result.length === 1) {
            console.log(`${pseudo} est connecté`)
            res.writeHead(302, {
                'Location': '/chat',
            });
            res.end();
        } else {
            console.log("Utilisateur non trouvé")
            res.send(`<form method="POST">
                        <input placeholder="pseudo" name="pseudo"><br>
                        <input placeholder="mot de passe" type="password" name="mdp"><br>
                        <button>Connexion</button>
                        <p style="background-color:red;">Utilisateur non trouvé</p>
                    </form>`)
        }
    })
})

// io.on('connection', (socket) => {
//     console.log('a user is connected');
//     socket.on('disconnect', () => {
//         console.log('a user is disconnected');
//     })
//     socket.on('chat', (msg) => {
//         console.log(`Message reçu ${msg}`)
//         io.emit('chat', msg)
//     })
// })

http.listen(port, () => {
    console.log(`Server listening at port : ${port}`)
})