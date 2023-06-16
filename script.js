const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.querySelector("button");
const exchangeBtn = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");
const checkbox = document.getElementById('toggle_checkbox');
const label = document.querySelector('label');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.body.style.background = 'linear-gradient(to right, #000000, #434343)';
        translateBtn.classList.remove('btn')
        translateBtn.classList.add('btn1')
        console.log(translateBtn.classList)

    } else {
        document.body.style.background = 'linear-gradient(to top, #D7DDE8, #757F9A)';
        translateBtn.classList.remove('btn1')
        translateBtn.classList.add('btn')
    }
});

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        //selecting eng and hindi by default id 0 means first select tag(from)
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        }
        else if (id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option); //adding to select tg
    }
});
exchangeBtn.addEventListener("click", () => {
    let temp = fromText.value;
    fromText.value = toText.value;
    toText.value = temp;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})
translateBtn.addEventListener("click", () => {
    const text = fromText.value;
    const translateFrom = selectTag[0].value;
    const translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating ...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    })
})

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                translateBtn.innerHTML = "Text Copied!"
                setTimeout(() => translateBtn.innerHTML = "Translate Text", 1200)
            }
            else {
                navigator.clipboard.writeText(toText.value);
                translateBtn.innerHTML = "Text Copied!"
                setTimeout(() => translateBtn.innerHTML = "Translate Text", 1200)
            }
        }
        else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }
            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[0].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})