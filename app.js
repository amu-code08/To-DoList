const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js");



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
let items = [];
let workItems=[];

app.get("/", (req, res) => {
    let day = date.getDay();
    //render all variables here
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    //create item and add it to the array
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    //redirect to render
});

app.get("/work", (req, res) => {
res.render("list", {listTitle: "Work", newListItems: workItems})
} );

app.get("/about", (req, res) => {
    res.render("about");
})


app.listen(3000, (res, req) => {
    console.log("Server has started  on port 3000.");
})