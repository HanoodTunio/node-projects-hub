const express = require("express");
const users = require("./Users.json");
const fs = require("fs")


const app = express();
const PORT = 8080;

// Middleware 
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from Middleware no: 1")
    // return res.json({ msg: "Hello from middle ware no 1.." })
    next();
})

app.use((req, res, next) => {
    console.log("Hello from Middleware no: 2")
    // return res.json({ msg: "Hello from middle ware no 1.." })
    // return res.end("Hey")
    next();
})

app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()}: ${req.method} ${req.url} \n`, (err, data) => {
        next();
    })

})

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
    //Headers
    res.setHeader("x-MyName", "Hanood Mumtaz"); // good practice to add X (it shows it is built in header)
    console.log(req.headers)
    return res.json(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post("/api/users", (req, res) => {
    const body = req.body
    // console.log(body)
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile("./Users.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ states: "Success", id: users.length })
    })
})

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id); // Get the user ID from the URL parameter
    const user = users.find(user => user.id === id); // Find the user by ID

    if (!user) {
        return res.status(404).json({ message: "User not found" }); // If user doesn't exist, return 404
    }

    const body = req.body; // Get the data from the request body

    // Update the user's information with the provided data
    if (body.first_name) user.first_name = body.first_name;
    if (body.last_name) user.last_name = body.last_name;
    if (body.email) user.email = body.email;
    if (body.gender) user.gender = body.gender;

    // Respond with the updated user object
    return res.json({ message: "User updated", user });
});

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id); // Get the user ID from the URL parameter
    const user = users.find(user => user.id === id); // Find the user by ID

    if (!user) {
        return res.status(404).json({ message: "User not found" }); // If user doesn't exist, return 404
    }

    const index = users.indexOf(user); // Get the index of the user in the array
    users.splice(index, 1); // Remove the user from the array

    // Write the updated users array to the file
    fs.writeFile("./Users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting user" }); // If error writing to the file
        }
        return res.json({ message: "User deleted" }); // Successfully deleted the user
    });
});


app.listen(PORT, () => {
    console.log("Server Started at port 8080..")
})