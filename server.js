

// require for path, express, and defining of the PORT for localhost


const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
var note = require("./db/db.json");



var PORT = process.env.PORT || 7000;




// sets up express to handle parsing


app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// **********
// api routes
// **********


// get /api/notes +get data from db.json

app.get("/api/notes", function (req, res) {

    // fs.readFile("./db/db.json", "UTF8", function (err) {

    //     if (err)
    //         throw (err)

    // });

    return res.json(note);

});



// post /api/notes + receive JSON obj from the front end


app.post("/api/notes", function (req, res) {

    var newNoteEntry = req.body;

    newNoteEntry.id = note.length;

    console.log(newNoteEntry);

    note.push(newNoteEntry);



    fs.writeFileSync("./db/db.json", JSON.stringify(note), function (err) {

        if (err)
            throw (err)

    });

    return res.status(200).end();
});




// delete /api/notes/:id


app.delete("/api/notes/:id", function (req, res) {

    // note = note.splice(req.params.id, 1);
    // console.log(note);

    note = note.filter(note => note.id != req.params.id);
    

    fs.writeFileSync("./db/db.json", JSON.stringify(note), "UTF8", function (err) {

        if (err)
            throw (err)

    })

    return res.json(note);


    // commented out old approach.

    // for (var i = 0; i < note.length; i++) {
    //     if (note[i].id === req.params.id) {

    //         return res.json(note);

    //     }
    // };

});



// ***********
// html routes
// ***********


// public static informs the HTML of where it can find
// the assets folder (style.css + index.js)


app.use(express.static("public"));



// get /notes => notes.html (must come before get *)


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});



// get * index.html


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


//localhost:7000 link

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}/`);
});
