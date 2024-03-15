let tbody = document.getElementById("tbody");
let addBtn = document.getElementById("addBtn");
let input = document.querySelector("#toDo");
let deleteAll = document.querySelector(".deleteAll");

let list = []

let status = "save";
let saves;


function useKeyboard() {
    if (status === "save") {
        addSomeThing();
    } else if (status === "update") {
        status = "save"
        addBtn.innerText = "Add Subject";
        addBtn.classList.replace("addBtn2", "addBtn");
        saveChanges(saves);
        clearInputs();
    }
}

addBtn.addEventListener("click", useKeyboard)


function addSomeThing() {
    let object = {
        subject: input.value
    };
    list.push(object);
    addToHtml();
    clearInputs();
    checkBtn();
};

function addToHtml() {
    let card = "";
    for (let i = 0; i < list.length; i += 1) {
        card += `
        <tr>
        <td>${(i + 1)}</td>
        <td>${list[i].subject}</td>
        <td><button class="update" onclick="updateThing(${i})">
                Update
            </button></td>
        <td><i onclick="deleteElement(${i})" class="fa-solid fa-xmark"></i></td>
        </tr>
        `
    };
    tbody.innerHTML = card;
};

function clearInputs() {
    input.value = "";
};

function deleteElement(index) {
    list.splice(index, 1);
    checkBtn();
    addToHtml();
};

function checkBtn(){
    if(list.length == 0){
        deleteAll.style.display = "none";
    }else{
        deleteAll.style.display = "inline-block";
    }
}

deleteAll.addEventListener("click", function(){
    list.splice(0);
    checkBtn();
    addToHtml();
})

function updateThing(index) {
    saves = index;
    input.value = list[index].subject;
    status = "update";
    addBtn.innerText = "Save Changes";
    addBtn.classList.replace("addBtn", "addBtn2");
};

function saveChanges(index) {
    list[index].subject = input.value;
    addToHtml();
};

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        useKeyboard()
    };
});