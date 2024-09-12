const cols = 53;
const rows = 7;

function make_checkboxes() {
    const body = document.body;
    const tbl = document.getElementById("style-table");
    tbl.style.width = "100%";
    tbl.style.border = "1px solid black";

    for(let i = 0; i < rows; ++i) {
        const tr = tbl.insertRow();
        for(let j = 0; j < cols; ++j) {
            const td = tr.insertCell();
            const chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");
            chk.setAttribute("class", "chk");
            chk.setAttribute("data-day", i + rows*j);
            td.appendChild(chk);
        }
    }
    body.appendChild(tbl);
}

function get_checkboxes() {
    return document.getElementsByTagName("input");
}

function save_in_storage() {
    let days = [];
    const checkboxes = get_checkboxes();
    for(let i = 0; i < checkboxes.length; ++i) {
        if(checkboxes[i].checked) {
            days.push(checkboxes[i].getAttribute("data-day"));
        }
    }

    browser.storage.sync.set({
        style: days
    });

    const start_date_input = document.getElementById("start_date_input");

    browser.storage.sync.set({
        start_date: start_date_input.value
    });
}

function load_from_saved() {
    browser.storage.sync.get("style").then((value) => {
        const days = value.style;
        if(days == null) {
            return;
        }

        let checkboxes = get_checkboxes();
        for(let i = 0; i < checkboxes.length; ++i) {
            const day = checkboxes[i].getAttribute("data-day");
            for(let j = 0; j < days.length; ++j) {
                if(day == days[j]) {
                    checkboxes[i].checked = true;
                    break;
                }
                else {
                    checkboxes[i].checked = false;
                }
            }
        }
    }, () => {});

    browser.storage.sync.get("start_date").then((value) => {
        const start_date = value.start_date;
        const start_date_input = document.getElementById("start_date_input");
        start_date_input.value = start_date;
    }, () => {});
}


window.addEventListener("load", () => {
    document.querySelector("form").addEventListener("submit", save_in_storage);
    make_checkboxes();
    load_from_saved();
});
