const path = require("path");
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    fs.readFile("counts.json", "utf-8", (error, result) => {
        if (error) throw error;
        const data = JSON.parse(result);
        const currentValue = data.additions + data.subtractions;
        response.render("index", {currentValue});
    })
});

app.post("/update", (request, response) => {
    const form = request.body;
    let newValue = {
        "additions": 0,
        "subtractions": 0,
        "status": true
    };

    fs.readFile("counts.json", "utf-8", (error, result) => {
        if (error) throw error;

        const currentValue = JSON.parse(result);
        newValue.additions = currentValue.additions;
        newValue.subtractions = currentValue.subtractions

        if (form.value > 0) {
            newValue.additions += 1;
        } else if (form.value < 0) {
            newValue.subtractions -= 1;
        } else { newValue.status = false};
    
        fs.writeFile("counts.json", JSON.stringify({"additions": newValue.additions, "subtractions": newValue.subtractions}), (error) => {
            if (error) throw error;
            response.json(newValue);
        })
    })
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`App available on "http://localhost:8080"`);
});
