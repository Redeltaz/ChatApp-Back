const db = require('./database');
const express = require("express")
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = 8080;

let isSession = false;

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.get('/test', (req, res) => {
    db.query(`SELECT * FROM user`, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

app.get('/connexion', (req, res) => {
    res.sendFile(__dirname + '/view/connexion.html')
})

app.get('/inscription', (req, res) => {
    res.sendFile(__dirname + '/view/inscription.html')
})

app.get('/logout', (req, res) => {
    res.clearCookie('pseudo');
    req.session.destroy();
    isSession = false;
    res.redirect('/')
})

app.get('/chat', (req, res) => {
    if (isSession === true) {
        res.sendFile(__dirname + '/view/chat.html')
    } else {
        res.end('<a href="/connexion">Connectez vous d\'abord</a>')
    }
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

let pseudoSession;

app.post('/connexion', (req, res) => {
    let pseudo = req.body.pseudo
    let mdp = req.body.mdp
    db.query(`SELECT * FROM user WHERE pseudo = '${pseudo}' AND password = '${mdp}'`, (err, result) => {
        if (err) throw err;
        if (result.length === 1) {
            console.log(`${pseudo} est connecté`)
            res.cookie('pseudo', `${pseudo}`)
            req.session.pseudo = pseudo
            pseudoSession = req.session.pseudo
            isSession = true;
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

io.on('connection', (socket) => {
    console.log('a user is connected');
    socket.on('disconnect', () => {
        console.log('a user is disconnected');
    })
    db.query(`SELECT content, sender FROM message`, (err, result) => {
        if (err) throw err;
        io.emit('oldchat', result)
    })
    socket.on('chat', (msg) => {
        db.query(`INSERT INTO message (content, sender) VALUES ('${msg}', '${pseudoSession}')`, (err, result) => {
            if (err) throw err;
            console.log(`Message envoyé ${msg}`)
        });
        io.emit('chat', msg)
    })
})

http.listen(port, () => {
    console.log(`Server listening at port : ${port}`)
})