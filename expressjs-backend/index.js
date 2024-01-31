const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = 8000;
const dotenv = require('dotenv');
const userServices = require('./models/user-services');
const User = require('./models/user');
const https = require("https");
const fs = require("fs")

dotenv.config();

process.env.TOKEN_SECRET;

app.use(express.json());
app.use(cors());

function authenticateToken(token) {
	console.log(token)
	try {
		jwt.verify(token, process.env.TOKEN_SECRET)
		console.log("LEGIT")
		return true
	} catch {
		return false
	}
}


function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users/all', async (req, res) => {
	console.log(req.body)
	if ("token" in req.body && authenticateToken(req.body.token)) {
		const users = await userServices.getAllUsers()
		console.log(users)
		res.json(users)
		res.status(200).end()
	} else {
		res.status(403).end()
	}
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', async (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

app.post('/login', async (req, res) => {
	const name = req.body.username;
	const pass = req.body.password;
	if ("token" in req.body && authenticateToken(req.body.token)) {
		res.status(200)
		res.json(req.body.token).end()
		return
	}
	const users = await userServices.findUserByName(name);
	console.log(users)
	if (users.length != 0) {
		users.forEach((user) => {
			if (user.password === pass) {
				res.status(200)
				res.json(generateAccessToken({ username: name })).end();
			}
		})
	} else {
		res.status(401).end();
	}
});

async function addUser(user){
    // users['users_list'].push(user);
    user.token = Math.floor(Math.random() * 100) + 1
    await userServices.addUser(user);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

https.createServer({
	key: fs.readFileSync("./reactcert/key.pem"),
	cert: fs.readFileSync("./reactcert/cert.pem")
}, app).listen(port, () => {
	userServices.run()
    console.log(`Example app listening at http://localhost:${port}`);
});