const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

const port = 8000;

app.listen(port, () => {
    console.log("Server is listening at ", port);
})


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
       username: "Anjuman",
       content: "Practice to be Brave enough"
    },
    {
        id: uuidv4(),
        username: "anjali gupta",
        content: "loves to see movies"
    },
    {
        id: uuidv4(),
        username: "Accenture",
        content: "Our company  has the best employees who doesn't do anything at all."
    },
    {
        id: uuidv4(),
        username: "Data Analyst",
        content: "5-6 LPA"
    },
    {
        id:uuidv4(),
        username: "Data Science",
        content: "4-6 LPA"
    },
    {
        id: uuidv4(),
        username: "Developer",
        content: "6-10 LPA"
    },
    {
        id: uuidv4(),
        username: "Associate Engineer",
        content: "4.5 - 7Lpa"
    },
    {
        id: uuidv4(),
        username: "Packaged App Development",
        content: "5- 7 LPA"
    },
    {
        id: uuidv4(),
        username: "JavaScript Developer ",
        content: "7 -10 Lpa"
    },
    {
        id: uuidv4(),
        username: "Software engineer",
        content: "10 - 30 LPA"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res) => {
    let {id}  = req.params;
    let post = posts.find((p) => id ==p.id);
    console.log(post);
    res.render("show.ejs", {post});
    
})
app.patch("/posts/:id", (req, res) => {
    let {id}  = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id ==p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");

    
})
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id!==p.id);

    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) =>{
    let {id}  = req.params;
    let post = posts.find((p) => id ==p.id);
    res.render("edit.ejs")
})

app.post("/posts", (req, res) => {
    console.log(req.body);
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({username, content, id });
    // res.render("index.ejs"); // not possible as posts is required so we will use
    res.redirect("/posts")
})








app.get("/", (req, res) => {
    res.send("<h1>Hello i'm from server.</h1>")
})