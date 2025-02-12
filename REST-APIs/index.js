const express = require("express");
const users = require("./Users.json");


const app = express();
const PORT = 8080;

app.get("/users", (req, res) => {
    const html = `
    <html>
    <body>
    <h1>Users</h1>
    <ul>
    ${users.map(user => `<li>${user.first_name} - ${user.last_name}</li>`).join('')}
        </ul>
        </body>
        </html>
    `
    return res.send(html);
})

app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post("/api/users", (req, res) => {
    return res.json({ states: "pending" })
})

app.patch("/api/users/:id", (req, res) => {
    //Edit the user with the id 
    return res.json({ states: "pending" })
})

app.delete("/api/users/:id", (req, res) => {
    //delete the user with the id 
    return res.json({ states: "pending" })
})


app.listen(PORT, () => {
    console.log("Server Started at port 8080..")
})