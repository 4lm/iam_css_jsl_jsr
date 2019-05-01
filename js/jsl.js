"use strict";
/**
 * Created by master on 01.03.16.
 */
function initialiseView() {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button");
    let ul = main.getElementsByTagName("ul")[0];
    const add = header.querySelector(".add-button");
    const litemplate = document.querySelector("main ul template");

    // Switching views
    header.onclick = () => {
        document.body.classList.toggle("tiles");
    }

    // Fade in|out
    refresh.onclick = () => {
        main.classList.toggle("faded");
        main.addEventListener("transitionend", ontransitionend);
    }

    function ontransitionend() {
        main.removeEventListener("transitionend", ontransitionend);
        main.classList.toggle("faded");
    }

    // List item selection
    ul.onclick = (e) => {
        const li = getCurrentLi(e.target);
        alert("Selected: " + getLiTitle(li) + " Click event on: " + e.target);
    }

    function getCurrentLi(el) {
        if (el.tagName === "LI") {
            return el;
        } else if (el.tagName === "UL") {
            alert("Reached list root, no LI found.");
        } else if (el.parentNode){
            return getCurrentLi(el.parentNode);
        } else {
            alert("Something went completly wrong.");
        }
    }

    function getLiTitle(li) {
        return li.getElementsByTagName("h2")[0].textContent;
    }

    // Add new elements
    add.onclick = (e) => {
        e.stopPropagation();
        addLiElementToList({
            title: "New Element " + Date.now(),
            src:"https://placeimg.com/150/150"
        });
    }

    function addLiElementToList(obj) {
        const li = document.importNode(litemplate.content, true);
        li.querySelector("img").src = obj.src;
        li.querySelector("h2").textContent = obj.title;
        ul.appendChild(li);
    }

    xhr("GET", "data/listitems.json", null, function(xhrobj) {
        const items = JSON.parse(xhrobj.responseText);
        items.forEach(element => {
            addLiElementToList(element);
        });
    });
}

window.onload = initialiseView;