const searchForm = document.querySelector(".js-searchForm"),
    searchInput = searchForm.querySelector("input")
;

const foodInfo = document.querySelector(".food-info"),
    totalDisplay = foodInfo.querySelector(".total"),
    foodList = foodInfo.querySelector(".list"),
    foodPage = foodInfo.querySelector(".paging")
;

const itemNode = document.querySelector("#item-template")
;

const API_URL = 'http://floating-harbor-78336.herokuapp.com/fastfood';

function showPaging(page, prePage, total, searchKeyword) {

    while(foodPage.firstChild) foodPage.removeChild(foodPage.firstChild);

    var aTag;
    var numPages = 5;
    var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor(total / perPage) + 1;

    if (pageEnd > totalPages) {
        pageEnd = totalPages;
    }

    var prevPage = pageStart - 1;
  
    if (prevPage < 1) {
        prevPage = 1;
    }

    var nextPage = pageEnd + 1;
  
    if (nextPage > totalPages) {
        nextPage = totalPages;
    }   

    // Paging - PREV
    aTag = document.createElement("a");

    aTag.href = `javascript:search(${prevPage}, ${prePage}, '${searchKeyword}')`;
    aTag.innerHTML = 'prev';
    aTag.className = 'prev';

    foodPage.appendChild(aTag);

    // Paging - Number
    for (let i = pageStart; i <= pageEnd; i++) {
        aTag = document.createElement("a");

        aTag.href = `javascript:search(${i}, ${prePage}, '${searchKeyword}')`;
        aTag.innerHTML = i;

        if (i === page) {
            aTag.className = 'current';
        }

        foodPage.appendChild(aTag);
    }

    // Paging - next
    aTag = document.createElement("a");

    aTag.href = `javascript:search(${nextPage}, ${prePage}, '${searchKeyword}')`;
    aTag.innerHTML = 'next';
    aTag.className = 'next';

    foodPage.appendChild(aTag);
}

async function search(page, prePage, searchKeyword) {
    while(foodList.firstChild) foodList.removeChild(foodList.firstChild);

    let searchValue, itemList, templateNode, total;

    if (typeof page !== 'number' || page < 1)
        page = 1;

    if (typeof perPage !== 'number' || perPage <= 0)
        perPage = 10;

    if(searchKeyword === undefined) {
        searchValue = searchInput.value
    } else {
        searchValue = searchKeyword;
    }

    await fetch(API_URL+`?searchKeyword=${searchValue}&page=${page}&prePage=${prePage}`)
      .then(response => response.json())
      .then(json => {
        itemList = json.list;
        total = json.total;

        totalDisplay.innerHTML  = total+" Awesome Food place.";

        for (let i = 0; i < itemList.length; i++) {
            templateNode = itemNode.cloneNode(true);

            templateNode.querySelector(".item-no").innerHTML = i+1;
            templateNode.querySelector(".item-name").innerHTML = itemList[i].name;
            templateNode.querySelector(".item-addr").innerHTML = itemList[i].addr;
            foodList.appendChild(templateNode);
        }
      });
    
    showPaging(page, perPage, total, searchValue);
}

function handleSubmit(event) {
    event.preventDefault();
    search(1, null);
}

function init() {
    itemNode.remove();
    searchForm.addEventListener("submit", handleSubmit);
}

init();
