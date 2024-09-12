function add_6am(date) {
    return date + " 06:00";
}

window.addEventListener('load', () => {
    console.log("load");
    document.body.style.border = "5px solid red";
    browser.storage.sync.get("style").then((value_style) => {
        console.log("style get");
        browser.storage.sync.get("start_date").then((value_start_date) => {
            console.log("start date get");
            const days = value_style.style; // black day
            const start_date = value_start_date.start_date;
            const start_time = Date.parse(add_6am(start_date));

            const now_time = Date.now();
            const elapsed_millisecs = now_time - start_time;
            const elapsed_days = Math.floor(elapsed_millisecs/1000/24/60/60);

            let today_is_in_days = false;
            for(let i = 0; i < days.length; ++i) {
                if(days[i] == elapsed_days) {
                    today_is_in_days = true;
                    break;
                }
            }

            console.log("style", days);
            console.log("start date", start_date);
            console.log(today_is_in_days);

            if(today_is_in_days) {
                const submit_btn = document.getElementById("submit_button");
                submit_btn.textContent = "제출불가";
                submit_btn.disabled = true;
            }
        }, () => {});
    }, () => {
        document.body.style.border = "5px solid black";
    });
});