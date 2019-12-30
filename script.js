/*
Creates an array from 1 - num
*/
function generateArray(num) {
    let items = [];
    for (let i = 1; i <= num; i++)
        items.push(i);
    return shuffle(items);
}

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

function getWidth(container_size, numitems) {
    return (container_size - numitems - 10) / numitems;
}

function getHeightMod(container_size, arr_size) {
    return (container_size - 10) / arr_size;
}

function generateItems(array) {
    let list = document.getElementById("b_container");
    list.innerHTML = "";

    width = getWidth(1000, array.length); //size of width == 1000
    height_mod = getHeightMod(500, array.length);
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

function handleGenerate(number) {
    generateItems(generateArray(number));
}

function getIds(items) {
    vals = [];
    for(let i = 0; i < items.length; i++)
        vals.push(parseInt(items[i].id))
    return vals;
}

function handleBubbleSort() {
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    let animations = bubbleSort(ids);

    animate(ids_unsorted, animations);
}

function handleQuickSort() 
{
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    let n = ids.length;
    let animations = quickSortIterative(ids, 0, n - 1);

    animate(ids_unsorted, animations);
}

function handleMergeSort()
{
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    let n = ids.length;
    let animations = mergeSort(ids, n);

    console.log(ids_unsorted);
    console.log(ids);
    console.log(animations);

    animate(ids_unsorted, animations);  
}

function handleHeapSort()
{
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    let n = ids.length;
    let animations = heapSort(ids);

    console.log(ids_unsorted);
    console.log(ids);
    console.log(animations);

    animate(ids_unsorted, animations);    
}

function animate_by_arrays(arr)
{
    let count = 0;
    let id = setInterval(frame, 100);

    function frame() {
        if (count < arr.length) 
        {
            generateItems(arr[count++]);
        }
        else
        {
            clearInterval(id);
        }
    }
}

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
  
