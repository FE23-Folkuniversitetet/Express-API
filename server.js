const express = require("express");
const app = express();
const PORT = 4000;

//array där vi sparar våra todos
let todos = [];

//middleware för att göra JSON tillgänglig i body 
app.use(express.json());

app.get("/todo", (req, res) => {
res.json(todos);
});

app.post("/todo", (req, res) => {
const { todo } = req.body; //variabel destructuring: extraherar värdet av todo från req.body till en variabel todo
let id = Math.floor(Math.random() * 2000); // skapar id för uppgiften
const newTodo = {todo, id, done: false}; //skapar ett nytt objekt för vår todo
todos.push(newTodo); //lägger till uppgiften i todos arrayen
	res.json(newTodo); //servern svarar med det nya objektet
});

app.get("/todo/:id", (req, res) => {
const id = parseInt(req.params.id);
const todo = todos.find((todo) => todo.id === id);

if(todo) {
	res.json(todo);
}else {
	res.status(404).json({ error: "Uppgiften kunde inte hittas." });
}
});

app.delete("/todo/:id", (req, res) => {
const id = parseInt(req.params.id);
const todoToDelete = todos.find((todo) => todo.id === id); //arrow function expression som jämför värdet av todo.id med id och returnerar det första som matchar

if(todoToDelete) {
todos.splice(todos.indexOf(todoToDelete), 1); //hittar index på första objektet i todos som matchar todoToDelete och tar bort. två argument: index för elementet som ska tas bort och antal element som ska tas bort. 

res.json(todoToDelete);
}
else {
	res.status(404).json({error: "Uppgiften kunde inte hittas."});
}
});



app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});