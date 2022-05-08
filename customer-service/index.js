const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "Dilanka123",
    database: "users",
    insecureAuth : true
});


const init = async ()=> {
const server = Hapi.server({
port: 8080,
host: '0.0.0.0'
});

server.route({
method: 'GET',
path: '/',
handler: (request, h) => {
return "Welcome to Stock";
}
});

server.route({
method: 'GET',
path: '/users',
handler: async (request, h) => {
const results = await getUsers();
return results;
}
});

server.route({
method: 'GET',
path: '/{id}',
handler: async (request, h) => {
const uid = request.params.id;
const results = await getUserById(uid);
return results;
}
});

server.route({
method: 'POST',
path: '/',
handler: async (request, h) => {
const email = request.payload.email;
const name = request.payload.name;
user = {};
user['email'] = email;
user['name'] = name;
const results = await getUserCreate(user);
return results;
}
});

await server.start();
console.log('Server is running in %s', server.info.uri);
};

function getUsers() {
return new Promise((resolve, reject) => {
con.query('SELECT * FROM user', [], function (error, results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

function getUserById(uid) {
return new Promise((resolve, reject) => {
con.query('SELECT * FROM user WHERE id = ' + uid, [], function (error,
results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

function getUserCreate(user) {
return new Promise((resolve, reject) => {
con.query('INSERT INTO user ( name, email) VALUES ("' + user.name +'","' +
user.email + '")', [], function (error, results) {
if (error) {
return reject(error)
}
console.log(results);
return resolve(results);
})
})
}

process.on('unhandledRejection', (err) => {
console.error("Unhandled Error", err);
process.exit(1);
});
init();