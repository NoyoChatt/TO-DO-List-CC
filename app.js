document.addEventListener("DOMContentLoaded", function() {
    const itemInput = document.querySelector("#item");
    const toDoBox = document.querySelector("#to-do-box");
    const removeAllButton = document.querySelector("#remove-all-button");

    itemInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addToDo();
        }
    });

    const addToDo = () => {
        const itemValue = itemInput.value.trim();

        if (itemValue === "") {
            alert("Please enter a valid item.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${itemValue}
            <i class="fas fa-times"></i>
        `;

        listItem.addEventListener("click", function() {
            this.classList.toggle("done");
            saveToLocalStorage();
        });

        listItem.querySelector("i").addEventListener("click", function(event) {
            event.stopPropagation();
            listItem.remove();
            saveToLocalStorage();
        });

        toDoBox.appendChild(listItem);
        itemInput.value = "";
        saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
        const items = Array.from(toDoBox.children).map((listItem) => listItem.innerText);
        localStorage.setItem("toDoItems", JSON.stringify(items));
    };

    const loadFromLocalStorage = () => {
        const storedItems = JSON.parse(localStorage.getItem("toDoItems"));
        if (storedItems) {
            storedItems.forEach((item) => {
                addToDo(item);
            });
        }
    };

    removeAllButton.addEventListener("click", function() {
        toDoBox.innerHTML = "";
        saveToLocalStorage();
    });

    loadFromLocalStorage();
});