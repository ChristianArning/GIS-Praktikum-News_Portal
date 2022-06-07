/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable no-caller */
/*
 *  Bei Verwendung der Vorlage den nachgoldenden Code bitte entfernen. Dieser dient nur zum Testen.  
 */

console.log("scripts.js wurde ausgeführt");

const lbutton = document.getElementById("loginbutton");

const objUser = [{
    username: "Keks",
    password: "pw1234"
}];

function getLoginData() {
    const username = document.getElementById("uname").value;
    const password = document.getElementById("upw").value;
    console.log("username " + username + " password" + password);

    for (i = 0; i < objUser.length; i++) {
        if (username == objUser[i].username && password == objUser[i].password) {
            console.log(username + " is logged in!");
            return;
        } else {
            console.log("inccorrect username or password");
        }
    }
}

const editor = document.getElementsByClassName("wp-webdeasy-comment-editor")[0];
const toolbar = editor.getElementsByClassName("toolbar")[0];
const buttons = toolbar.querySelectorAll(".editor-btn:not(.has-submenu)");
const contentArea = editor.getElementsByClassName("content-area")[0];
const visuellView = contentArea.getElementsByClassName("visuell-view")[0];
const htmlView = contentArea.getElementsByClassName("html-view")[0];
const modal = document.getElementsByClassName("modal")[0];

document.addEventListener("selectionchange", selectionChange);

visuellView.addEventListener("paste", pasteEvent);

contentArea.addEventListener("keypress", addParagraphTag);

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    button.addEventListener("click", function() {
        const action = this.dataset.action;
        const value = this.dataset.value;

        switch (action) {
            case "toggle-view":
                execCodeAction(this, editor);
                break;
            case "createLink":
                execLinkAction();
                break;
            default:
                execDefaultAction(action, value);
        }
    });
}

function execCodeAction(button, editor) {
    if (button.classList.contains("active")) {
        visuellView.innerHTML = htmlView.value;
        htmlView.style.display = "none";
        visuellView.style.display = "block";

        button.classList.remove("active");
    } else {
        htmlView.innerText = visuellView.innerHTML;
        visuellView.style.display = "none";
        htmlView.style.display = "block";

        button.classList.add("active");
    }
}

function execLinkAction() {
    modal.style.display = "block";
    const selection = saveSelection();

    const submit = modal.querySelectorAll("button.done")[0];
    const close = modal.querySelectorAll(".close")[0];

    submit.addEventListener("click", function(e) {
        e.preventDefault();
        const newTabCheckbox = modal.querySelectorAll("#new-tab")[0];
        const linkInput = modal.querySelectorAll("#linkValue")[0];
        const linkValue = linkInput.value;
        const newTab = newTabCheckbox.checked;

        restoreSelection(selection);

        if (window.getSelection().toString()) {
            const a = document.createElement("a");
            a.href = linkValue;
            if (newTab) a.target = "_blank";
            window.getSelection().getRangeAt(0).surroundContents(a);
        }

        modal.style.display = "none";
        linkInput.value = "";

        submit.removeEventListener("click", arguments.callee);
        close.removeEventListener("click", arguments.callee);
    });

    close.addEventListener("click", function(e) {
        e.preventDefault();
        const linkInput = modal.querySelectorAll("#linkValue")[0];

        modal.style.display = "none";
        linkInput.value = "";

        submit.removeEventListener("click", arguments.callee);
        close.removeEventListener("click", arguments.callee);
    });
}

function execDefaultAction(action, value) {
    document.execCommand(action, false, value);
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            const ranges = [];
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(savedSel) {
    if (savedSel) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for (let i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}

function selectionChange(e) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        // don't remove active class on code toggle button
        if (button.dataset.action === "toggle-code") continue;

        button.classList.remove("active");
    }

    if (!childOf(window.getSelection().anchorNode.parentNode, editor)) return false;

    parentTagActive(window.getSelection().anchorNode.parentNode);
}

function childOf(child, parent) {
    return parent.contains(child);
}

function parentTagActive(elem) {
    if (!elem || !elem.classList || elem.classList.contains("visuell-view")) return false;

    let toolbarButton;

    const tagName = elem.tagName.toLowerCase();
    toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-tag-name="${tagName}"]`)[0];
    if (toolbarButton) {
        toolbarButton.classList.add("active");
    }

    const textAlign = elem.style.textAlign;
    toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-style="textAlign:${textAlign}"]`)[0];
    if (toolbarButton) {
        toolbarButton.classList.add("active");
    }

    return parentTagActive(elem.parentNode);
}


function pasteEvent(e) {
    e.preventDefault();

    const text = (e.originalEvent || e).clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
}


function addParagraphTag(evt) {
    if (evt.keyCode == "13") {
        if (window.getSelection().anchorNode.parentNode.tagName === "LI") return;
        document.execCommand("formatBlock", false, "br");
    }
}

let x;
let i;
let j;
let l;
let ll;
let selElmnt;
let a;
let b;
let c;

x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            let y;
            let i;
            let k;
            let s;
            let h;
            let sl;
            let yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    let x;
    let y;
    let i;
    let xl;
    let yl;
    let arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.getElementById("SaveBT-Editor").addEventListener("click", saveArticle);

function saveArticle(){
    sendJSONStringWithPOST(
        'http://127.0.0.1:3000/search',
        JSON.stringify({ test: "Dies ist ein Test" })
      );
}

async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
      method: 'post',
      body: jsonString,
    });
  }

document.addEventListener("click", closeAllSelect);