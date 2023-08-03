let currentValue = 0;
const counter = document.getElementById("counter");
const minusBtn = document.getElementById("minus");
const addBtn = document.getElementById("add");
const themeSwitcher = document.getElementById("theme-toggler");
const body = document.querySelector("body");

let updateValue = 0;

minusBtn.onclick = () => {
    update(-1);
}

addBtn.onclick = () => {
    update(1);
}

function update(value) {
    fetch("/update", {
        method: "POST",
        body: JSON.stringify({"value":value}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (!response.ok) throw response.status;
        return response.json();
    })
    .then((newValue) => {
        if (!newValue.status) alert("Error: you inputed a zero");
        counter.innerHTML = newValue.additions + newValue.subtractions;
        console.log(newValue);
    })
    .catch((error) => {
        throw error;
    })
}

themeSwitcher.onclick = () => {
    body.dataset.theme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (body.getAttribute("data-theme") == "dark") {
        body.style.setProperty("--primary-white", "#101010");
        body.style.setProperty("--primary-black", "#fefefe");
    } else  {
        body.style.setProperty("--primary-white", "#fefefe");
        body.style.setProperty("--primary-black", "#101010");
    }
}