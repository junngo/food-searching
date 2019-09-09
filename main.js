const searchForm = document.querySelector(".js-searchForm"),
    searchInput = searchForm.querySelector("input"),
    totalDisplay = document.querySelector(".total"),
    foodList = document.querySelector(".food-list"),
    itemNode = foodList.querySelector("#item-template")
    ;

const API_URL = 'http://floating-harbor-78336.herokuapp.com/fastfood';

function handleSubmit(event) {
    event.preventDefault();
    
    const currentValue = searchInput.value;
    let templateNode;
    
    console.log(currentValue);
    searchInput.value = ""

    fetch(API_URL)
      .then(response => response.json())
      .then(json => {
        var itemList = json.list;
        totalDisplay.innerHTML  = json.total+" Awesome Food place.";

        for (let i = 0; i < itemList.length; i++) {
            console.log(itemList[i]);
            templateNode = itemNode.cloneNode(true);
            
            templateNode.querySelector(".item-no").innerHTML = i+1;
            templateNode.querySelector(".item-name").innerHTML = itemList[i].name;
            templateNode.querySelector(".item-addr").innerHTML = itemList[i].addr;
            foodList.appendChild(templateNode);
        }
 
      });
}

function init() {
    itemNode.remove();
    searchForm.addEventListener("submit", handleSubmit);
}

init();
