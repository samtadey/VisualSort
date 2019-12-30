
/*
Start of Bubble Sort
*/

function bubbleSort(arr) {
    let animations = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++)
    {
        for (let j = 0; j < n-i-1; j++)
        {
            if (arr[j] > arr[j+1])
            {
                animations.push({one: j, two: j+1});
                
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            } 
        }
    }
    return animations;
}

/*
Start of Quick Sort
*/

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



// function mergeSort(arr, l, r, animate) 
// { 
//     if (l < r) 
//     { 
//         let m = Math.floor(l+(r-l)/2); //Same as (l+r)/2 but avoids overflow for large l & h
//         let n = [...animate];

//         let left_an = mergeSort(arr, l, m, animate); 
//         let right_an = mergeSort(arr, m+1, r, animate);

//         for (let i = n.length; i < left_an.length; i++)
//             animate.push(left_an[i]);
//         for (let i = n.length; i < right_an.length; i++)
//             animate.push(right_an[i]);

//         return merge(arr, l, m, r); 
//     } 
//     return animate;
// } 

/*
Start of Merge Sort
*/

function mergeSort(arr, n) 
{ 
        
    // For current size of subarrays to 
    // be merged cur_size varies from  
    // 1 to n/2 
    let cur_size;  
                    
    // For picking starting index of  
    // left subarray to be merged 
    let l; 
    let animate = []; 
    let to_add = [];                
        
    // Merge subarrays in bottom up  
    // manner. First merge subarrays  
    // of size 1 to create sorted  
    // subarrays of size 2, then merge 
    // subarrays of size 2 to create  
    // sorted subarrays of size 4, and 
    // so on. 
    for (cur_size = 1; cur_size <= n-1; cur_size = 2*cur_size) 
    { 
        // Pick starting point of different 
        // subarrays of current size 
        for (l = 0; l < n-1; l += 2*cur_size) 
        { 
            // Find ending point of left  
            // subarray. mid+1 is starting  
            // point of right 
            let m = Math.min(l + cur_size - 1, n-1); 
        
            let r = Math.min(l + 2*cur_size - 1, n-1); 
        
            // Merge Subarrays arr[l...mid] 
            // & arr[mid+1...right_end] 
            to_add = merge(arr, l, m, r);
            //animate.push(to_add);
            for (let i = 0; i < to_add.length; i++)
                animate.push({one: to_add[i].one, two: to_add[i].two}); 
        } 
    } 
    return animate;
}


/* Function to merge the two halves arr[l..m] and arr[m+1..r] of array arr[] */
function merge(arr, l, m, r) 
{ 
    let i, j, k; 
    let n1 = m - l + 1; 
    let n2 =  r - m; 
  
    /* create temp arrays */
    let L = [];
    let R = []; 

    let animate = [];
  
    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++) 
        L.push(arr[l + i]); 
    for (j = 0; j < n2; j++) 
        R.push(arr[m + 1 + j]); 
  
    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; 
    j = 0; 
    k = l; 
    while (i < n1 && j < n2) 
    { 
        if (L[i] <= R[j]) 
        { 
            animate.push({one: k, two: l+i});
            arr[k] = L[i]; 
            i++; 
        } 
        else
        { 
            animate.push({one: k, two: m+1+j});
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
  
    /* Copy the remaining elements of L[], if there are any */
    while (i < n1) 
    { 
        animate.push({one: k, two: l+i});
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
  
    /* Copy the remaining elements of R[], if there are any */
    while (j < n2) 
    { 
        animate.push({one: k, two: m+1+j});
        arr[k] = R[j]; 
        j++; 
        k++; 
    } 
    //console.log(arr);
    //return snapshot of array -> rerender that
    //return [...arr];
    return animate;
} 

/*
Start of Heap Sort
*/

function heapSort(arr) 
{ 
    let n = arr.length; 
    let animate = [];
    let to_add = []

    // Build heap (rearrange array) 
    for (let i = n / 2 - 1; i >= 0; i--) 
    {
        to_add = heapify(arr, n, i, animate); 

        for (let a = 0; a < to_add.length; a++)
            animate.push({one: to_add[a].one, two: to_add[a].two});
    }

    // One by one extract an element from heap 
    for (let i=n-1; i>=0; i--) 
    { 
        // Move current root to end
        animate.push({one: 0, two: i}); 
        let temp = arr[0]; 
        arr[0] = arr[i]; 
        arr[i] = temp; 

        // call max heapify on the reduced heap 
        to_add = heapify(arr, i, 0, animate);
        
        for (let a = 0; a < to_add.length; a++)
            animate.push({one: to_add[a].one, two: to_add[a].two});
    }
    return animate; 
}

function heapify(arr, n, i, animate) 
{ 
    let to_add = [];
    let more_to_add = [];
    let largest = i; // Initialize largest as root 
    let l = 2*i + 1; // left = 2*i + 1 
    let r = 2*i + 2; // right = 2*i + 2 

    // If left child is larger than root 
    if (l < n && arr[l] > arr[largest]) 
        largest = l; 

    // If right child is larger than largest so far 
    if (r < n && arr[r] > arr[largest]) 
        largest = r; 

    // If largest is not root 
    if (largest != i) 
    { 
        to_add.push({one: i, two: largest});
        let swap = arr[i]; 
        arr[i] = arr[largest]; 
        arr[largest] = swap; 

        // Recursively heapify the affected sub-tree 
        let more_to_add = heapify(arr, n, largest, animate); 
        for (let a = 0; a < more_to_add.length; a++)
            to_add.push({one: more_to_add[a].one, two: more_to_add[a].two});
    } 
    return to_add;
} 
