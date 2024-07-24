const form = document.querySelector("form");
const eField = form.querySelector(".email"),
      eInput = eField.querySelector("input"),
      pField = form.querySelector(".password"),
      pInput = pField.querySelector("input"),
      pcField = form.querySelector(".password-confirm"),
      pcInput = pcField.querySelector("input");

form.onsubmit = (e) => {
    e.preventDefault();

    (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
    (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
    (pcInput.value == "" || pcInput.value !== pInput.value) ? pcField.classList.add("shake", "error") : checkPassConfirm();

    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
        pcField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => { checkEmail(); }
    pInput.onkeyup = () => { checkPass(); }
    pcInput.onkeyup = () => { checkPassConfirm(); }

    function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            eField.classList.add("error");
            eField.classList.remove("valid");
            let errorTxt = eField.querySelector(".error-txt");
            (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
        } else {
            eField.classList.remove("error");
            eField.classList.add("valid");
        }
    }

    function checkPass() {
        if (pInput.value == "") {
            pField.classList.add("error");
            pField.classList.remove("valid");
        } else {
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    function checkPassConfirm() {
        if (pcInput.value == "" || pcInput.value !== pInput.value) {
            pcField.classList.add("error");
            pcField.classList.remove("valid");
        } else {
            pcField.classList.remove("error");
            pcField.classList.add("valid");
        }
    }

    if (!eField.classList.contains("error") && !pField.classList.contains("error") && !pcField.classList.contains("error")) {
        window.location.href = form.getAttribute("action");
    }
}
