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

function getHeightMod(container_size, max_height) {
    return container_size / max_height;
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

function handlebubbleSort() {
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = getIds(items);
    let n = items.length;
    let animations = []
 
    for (let i = 0; i < n - 1; i++)
    {
        for (let j = 0; j < n-i-1; j++)
        {
            if (ids[j] > ids[j+1])
            {
                animations.push({one: j, two: j+1});
                
                let temp = ids[j];
                ids[j] = ids[j+1];
                ids[j+1] = temp;
            } 
        }
    }
    console.log(ids_unsorted)
    console.log(ids)
    console.log(animations);
    animate(ids_unsorted, animations);
}

function partition(arr, low, high) 
{ 
    let animations = [];
    let pivot = arr[high];  
    let i = (low-1); // index of smaller element 
    for (let j=low; j<high; j++) 
    { 
        // If current element is smaller than the pivot 
        if (arr[j] < pivot) 
        { 
            i++; 
            animations.push({one: i, two: j});
            // swap arr[i] and arr[j] 
            let temp = arr[i];
            arr[i] = arr[j]; 
            arr[j] = temp; 
        } 
    } 
    // swap arr[i+1] and arr[high] (or pivot)
    animations.push({one: i+1, two: high}); 
    let temp = arr[i+1];
    arr[i+1] = arr[high]; 
    arr[high] = temp; 

    return {pi: i+1, animations: animations}; 
} 

function quickSortIterative(arr, l, h) 
{ 
    //Create an auxiliary stack 
    //let stack = new int[h - l + 1];
    let stack = [];
    for (let i = 0; i < h - l + 1; i++)
        stack.push(0);

    // initialize top of stack 
    let top = -1; 

    // push initial values of l and h to stack 
    stack[++top] = l; 
    stack[++top] = h; 

    let animate = [];
    // Keep popping from stack while is not empty 
    while (top >= 0) { 
        // Pop h and l 
        h = stack[top--]; 
        l = stack[top--]; 

        // Set pivot element at its correct position 
        // in sorted array 
        let part = partition(arr, l, h);
        let p = part.pi; 
        let anim = part.animations;
        
        for (let i = 0; i < anim.length; i++)
            animate.push({one: anim[i].one, two: anim[i].two});

        // If there are elements on left side of pivot, 
        // then push left side to stack 
        if (p - 1 > l) { 
            stack[++top] = l; 
            stack[++top] = p - 1; 
        } 

        // If there are elements on right side of pivot, 
        // then push right side to stack 
        if (p + 1 < h) { 
            stack[++top] = p + 1; 
            stack[++top] = h; 
        } 
    } 

    return animate;
} 

function handleQuickSort() 
{
    let items = document.getElementsByClassName("item");
    let ids = getIds(items);
    let ids_unsorted = [...ids];
    let n = ids.length;
    console.log(ids);
    let animations = quickSortIterative(ids, 0, n - 1);
    console.log(animations)
    console.log(ids);
    animate(ids_unsorted, animations);
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
  
