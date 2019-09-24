function bstRecursive(array, num) {
    let start = 0;
    let end = array.length - 1

    let mid = Math.floor((end - start) / 2)
    let value = array[mid]

    if (value === num) {
        console.log(num)
        return num
    } else if ( value < num) {
        console.log(value)
        return bstRecursive(array.splice(mid, array.length), num)
    } else if (value > num) {
        console.log(value)
        return bstRecursive(array.splice(0, mid), num)
    }
}

bstRecursive([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 17, 0, [3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 17)

// height of bst

/*

    1. if node.left or node.right == 1 + f(next_level.left), f(next_level.right) 
    2. if not node return 0
    3. if not node.left and not node.right return 1

*/

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

let tree = new BinarySearchTree('a', 1)
tree.left = new BinarySearchTree('b', 0)
tree.right = new BinarySearchTree('c', 4)
tree.right.right = new BinarySearchTree('d', 5)
tree.right.right.left = new BinarySearchTree('e', 6)

function heightOfBst(tree) {
    if (!tree) {
        return 0
    } else if (tree.left || tree.right) {
        return 1 + Math.max(heightOfBst(tree.left), heightOfBst(tree.right))
    } else if (!tree.left && ! tree.right) {
        return 1
    }
}

console.log(heightOfBst(tree))

