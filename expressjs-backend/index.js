const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
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

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    console.log(users.users_list)
    res.status(200).end();
});

app.post('/login', (req, res) => {
	const name = req.body.username;
	const pass = req.body.password;
	users_filtered = users['users_list'].filter( (user) => user['username'] === name)
	console.log(users_filtered)
	if (users_filtered.length != 0) {
		users_filtered.forEach((user) => {
			if (user.password === pass) {
				res.status(200).end();
			}
		})
	} else {
		res.status(401).end();
	}
});

function addUser(user){
    users['users_list'].push(user);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         username : 'tpr2',
         password: 'pass'
      }
  	]	
}