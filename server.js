// require for path, express, and defining of the PORT for localhost

const path = require("path");
const express = require("express");
const app = express();

var PORT = process.env.PORT || 7000;





// api routes

// get /api/notes
// get data from db.json
// return res.json(data);

// post /api/notes
// receive JSON obj from the front end
// return res.status(200).end();

// delete /api/notes/:id


// ^above needs much work
//+++++++++++++++++++++++++++++++++
// * below is more or less complete.


// html routes

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


app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}/`);
});
