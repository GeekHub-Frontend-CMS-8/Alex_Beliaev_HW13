var inputTask  = document.getElementById("inputTask"); // Объявляем переменную. Для ввода task-ка
var listTask   = document.getElementById("listTask"); // Объявляем переменную, для ввывода списка task-ков
var listTaskCompleted = document.getElementsByClassName("listTaskCompleted"); // Переменная для списка завершенных task-ков

// Функция, по созданию елемента
function createNewElement(task) {
    let listItem = document.createElement("li"); // Создаем элемент li

    //BLOCK CONTENT
    let divContent = document.createElement("div"); // Создаем блок, для checkbox и task-ка
    divContent.className = "block-task-content"; // Присваиваем блоку класс item-task-content

    //BLOCK BUTTONS
    let divButtons = document.createElement("div"); // Создаем блок, для кнопок edit и delete
    divButtons.className = "block-task-buttons"; // Присваиваем блоку класс item-task-button

    // Начинка для блока CONTENT
    let checkbox = document.createElement("input"); // Создаем элемент input [checkbox]
    checkbox.type = "checkbox"; // Елемент input [checkbox] меняем тип с text на checkbox
    checkbox.className = "checkbox"; // К елементу добавляем класс (потратил 3 часа, чтоб найти ошибку :) )
    let label = document.createElement("label"); // Создаем элемент label
    label.innerText = task;                      // Закидуем в элемент label - task
    let input = document.createElement("input"); // Создаем элемент input (для редактирования task-ка)
    input.type = "text";                         // Елемент input меняем тип text

    // Начинка для блока BUTTONS
    let editButton = document.createElement("button"); // Создаем кнопку EDIT
    editButton.className = "item-task-button-edit"; // Присваиваем кнопке класс item-task-button-edit
    editButton.innerHTML = '<i class=\"fas fa-edit\"></i>'; // К кнопке добавляем иконку

    let deleteButton = document.createElement("button"); // Создаем кнопку DELETE
    deleteButton.className = "item-task-button-delete"; // Присваиваем кнопке класс item-task-button-delete
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>'; // К кнопке добавляем иконку

    // В блок CONTENT добавляем 3 элемента
    divContent.appendChild(checkbox);
    divContent.appendChild(label);
    divContent.appendChild(input);

    // В блок Button добавляем 2 кнопки
    divButtons.appendChild(editButton);
    divButtons.appendChild(deleteButton);

    // В элемент li, добавляем два предыдущих блока
    listItem.appendChild(divContent);
    listItem.appendChild(divButtons);

    return listItem // Возращяем элемент li с другими внутренними элементами

}

// Функция по добавлению task-ка в список незавершенных задач
function addTask() {
    if (inputTask.value) { // Если в inputTask-ке будет любое значение, то выполнить код
        let listItem = createNewElement(inputTask.value); // Создаем элемент и добавляем к нему значение
        listTask.appendChild(listItem); // Добавляем нашу переменную в список незавершенных задач
        taskEvents(listItem, completedTask); // Добавляем функцию событий
        inputTask.value = ""; // Очищаем input
        console.log("addTask: " + true); // Проверка выполения функции
    }
    else { // При не выполнении функции, выведи - false
        console.log("addTask: " + false); // Проверка выполнения функции
    }

}


//Функция по удалению task-ка с списка
function deleteTask() {
    let blockButtons = this.parentNode; // Вычисляем, в каком блоке находиться кнопка (Родительский элемент)
    let li = blockButtons.parentNode; // Вычисляем, где находиться этот блок li > block-buttons
    let ul = li.parentNode; // Вычислили, где находиться список ul > li
    ul.removeChild(li); // Удаляем с списка элемент li
    console.log("deleteTask: " + true); // Проверка выполнения функции
}

function editTask() {
    let editButton = this;
    let blockContent = this.parentNode;
    let listItem = blockContent.parentNode;
    let label = listItem.querySelector("label");
    let input = listItem.querySelector("input[type=text]");
    console.log();

    let containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerHTML = input.value;
        iconEditButton = editButton.querySelector("i");
    }


    console.log("editTask: " + true); // Проверка выполнения функции
}

function completedTask() {
    console.log("completedTask: " + true); // Проверка выполнения функции
}

// Событие
inputTask.onchange = addTask; // При нажатии Enter, вызываем функцию addTask

function taskEvents (listItem, checkboxEvent) {
    let checkbox = listItem.getElementsByClassName("checkbox"); // Ищём первый элемент с классом .checkbox
    let deleteButton = listItem.querySelector("button.item-task-button-delete"); // Ищём первый элемент с классом .button.item-task-button-delete
    let editButton = listItem.querySelector("button.item-task-button-edit"); // Ищём первый элемент с классом .button.item-task-button-edit

    checkbox.onchange = checkboxEvent; // Если один раз нажали на checkbox, то вызываем функцию completedTask
    editButton.onclick = editTask; // Если один раз нажали на editButton, то вызываем функцию editTask
    deleteButton.onclick = deleteTask; // Если один раз нажали на deleteButton, то вызываем функцию deleteTask
}

