/*
Creates an array from 1 - num
*/
function generateArray(num) {
    let items = [];
    for (let i = 1; i <= num; i++)
        items.push(i);
    return shuffle(items);
}

/*
Randomly shuffles the array
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) 
    {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
Determines the width for the sortable items
*/
function getWidth(container_size, numitems) {
    return (container_size - numitems - 10) / numitems;
}

/*
Determines the height for the sortable items
*/
function getHeightMod(container_size, arr_size) {
    return (container_size - 10) / arr_size;
}

/*
Generates the html items from an array if integers
*/
function generateItems(array) {
    let list = document.getElementById("b_container");
    list.innerHTML = "";

    width = getWidth(1000, array.length); //size of width == 1000
    height_mod = getHeightMod(550, array.length);
    for(let i = 0; i < array.length; i++)
    {
        let item = document.createElement("div");
        item.setAttribute("id", array[i]);
        item.setAttribute("class", "item");
        item.style.height = array[i]*height_mod + "px";
        item.style.width = width + "px";
        list.appendChild(item);
    }
}

/*
Returns the number of array items to generate
*/
function getSize() {  
    if(document.getElementById('sml').checked) { 
        return 50;
    } 
    else if(document.getElementById('med').checked) { 
        return 200;
    } 
    else if(document.getElementById('lrg').checked) { 
        return 400;   
    } 
    return 150;
} 

/*
Onclick function to generate the unsorted array
*/
function handleGenerate() {
    generateItems(generateArray(getSize()));
}

/*
Returns the id's of the array items in integer array form
*/
function getIds(items) {
    vals = [];
    for(let i = 0; i < items.length; i++)
        vals.push(parseInt(items[i].id))
    return vals;
}

/*
Prepares two arrays to pass into the sorting handler functions
*/
function prepArrays() 
{
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    return {ids: ids, ids_unsorted: ids_unsorted};
}

/*
Event handler function to bubble sort the array
*/
function handleBubbleSort() {
    let arrays = prepArrays();
    let animations = bubbleSort(arrays.ids);
    animate(arrays.ids_unsorted, animations);
}

/*
Event handler function to quick sort the array
*/
function handleQuickSort() 
{
    let arrays = prepArrays();
    let n = arrays.ids.length;
    let animations = quickSortIterative(arrays.ids, 0, n - 1);
    animate(arrays.ids_unsorted, animations);
}

/*
Event handler function to pancake sort the array
*/
function handlePancakeSort()
{
    let arrays = prepArrays();
    let animations = pancakeSort(arrays.ids);
    animate(arrays.ids_unsorted, animations);    
}

// function handleMergeSort()
// {
//     let items = document.getElementsByClassName("item");
//     let ids = getIds(items);
//     let ids_unsorted = [...ids];
//     let n = ids.length;
//     let animations = mergeSort(ids, n);

//     console.log(ids_unsorted);
//     console.log(ids);
//     console.log(animations);

//     animate(ids_unsorted, animations);  
// }

/*
Event handler function to heap sort the array
*/
function handleHeapSort()
{
    let arrays = prepArrays();
    let n = arrays.ids.length;
    let animations = heapSort(arrays.ids);
    animate(arrays.ids_unsorted, animations);    
}

/*
Handles the animation of the sorting
Sorts the ids array based on the animations returned from the sorting functions.
*/
function animate(ids, animations) {
    let count = 0;
    let id = setInterval(frame, 5);

    function frame() {
        if (count < animations.length) 
        {
            let one = animations[count].one;
            let two = animations[count++].two;
            let temp = ids[one];
            ids[one] = ids[two];
            ids[two] = temp;
            generateItems(ids);
        }
        else
        {
            clearInterval(id);
        }
    }
}
  
