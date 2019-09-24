/*

    Given a document, implement an algorithm to count the number of word occurrences.

    - Input: `"Hello there, how are you? Can you tell me how to get to the nearest Starbucks?"`
    - Output: `Hello = 1, there = 1, how = 2, are = 1, you = 2`

    Pseudocode:
    1. keep object with word count
    2. str.split then foreach str.trim()
    3. foreach word => update wordcount
    4. return object.keys and count

    Runtime:

*/

function wordCount(str) {
    const wordCount = {};
    let words = str.split(' ');
    let msg = ''
    words.forEach(word => {
        if (!wordCount[word]) {
            wordCount[word] = 1
        } else {
            wordCount[word] = wordCount[word] + 1
        }
    })
    Object.keys(wordCount).forEach(word => {
        msg += `${word} = ${wordCount[word]}, `
    })
    return msg;
}

wordCount("Hello there, how are you? Can you tell me how to get to the nearest Starbucks?")
// Hello = 1, there, = 1, how = 2, are = 1, you? = 1, Can = 1, you = 1, tell = 1, me = 1, to = 2, get = 1, the = 1, nearest = 1, Starbucks? = 1, 

/*
    Given a sorted linked list, write an algorithm to delete all duplicate numbers from the sorted linked list

    -Input: 1->1->1->2->3->3->4->4->4
    -Output: 1->2->3->4

    Pseudocode:
    1. keep track of head, curr, second (curr.next)
    2. if (second and second.value === curr.value) => second = second.next
    3. curr.next = second; curr = curr.next; second = second.next
    return head
*/

// class definitions for Node and Linked List

class _Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
    }
    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }
    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            let tempNode = this.head
            while (tempNode.next !== null) {
                tempNode = tempNode.next
            }
            tempNode.next = new _Node(item, null)
        }
    }
    find(item) {
        let currentNode = this.head
        if (!this.head) {
            return null
        }

        while (currentNode.value !== item) {
            if (currentNode.next === null) {
                return null
            } else {
                currentNode = currentNode.next
            }
        }
        return currentNode
    }
    remove(item) {
        if (!this.head) {
            return null
        }
        if (this.head.value === item) {
            this.head = this.head.next
        }
        let currentNode = this.head
        let previousNode = this.head

        while ((currentNode !== null) && (currentNode.value !== item)) {
            previousNode = currentNode
            currentNode = currentNode.next
        }
        if (currentNode === null) {
            console.log('Item not found')
            return
        }
        previousNode.next = currentNode.next
    }
    insertBefore(key, item) {
        if (!this.head) {
            this.insertFirst(item)
        }
        let curr = this.head
        let prev = this.head
        while ((curr !== null) && (curr.value !== key)) {
            prev = curr
            curr = curr.next
        }
        if (curr === null) {
            console.log('key not found')
            prev.next = new _Node(item, null)
        }
        prev.next = new _Node(item, curr)
    }
    insertAfter(key, item) {
        if (!this.head) {
            this.insertFirst(item)
        }
        let prev = this.head
        let curr = this.head
        while ((curr !== null) && (prev.value !== key)) {
            prev = curr
            curr = curr.next
        }
        if (curr === null) {
            prev.next = new _Node(item, null)
        }
        prev.next = new _Node(item, curr)
    }
    insertAt(index, item) {
        let curr = this.head
        if (index == 0) {
            this.insertFirst(item)
        }
        for (let i = 0; i < index - 1; i++) {
            if (!curr) {
                console.log('past length of list')
                return 
            }
            curr = curr.next
        }
        curr.next = new _Node(item, curr.next)
    }
    log() {
        let curr = this.head
    }
}

// creating a linkedt list

const sequence = [1,1,1,2,3,3,4,4,4]

let head = new _Node(1)
let curr = head
sequence.forEach(num => {
    let node = new _Node(num)
    curr.next = node
    curr = curr.next;
    node.next = null
})

const linkedList = new LinkedList()
linkedList.head = head

function deleteDuplicate(linkedList) {
    let head = linkedList.head
    let curr = linkedList.head
    let second = curr.next
    while (second) {
        while (second && second.value === curr.value) {
            // if current and second have same value, second moves ahead one
            second = second.next
        }
        curr.next = second
        curr = curr.next
        if (second) {
            second = second.next
        }
    }
    while (curr && curr.next) {
        if (curr.value === curr.next.value) {
            // curr and curr.next are duplicates
            curr.next = curr.next.next
        }
    }
    return head
}

let freshList = deleteDuplicate(linkedList);

console.log('***********************************')
console.log('Delete duplicate numbers from sorted linked list')
console.log('linked list sequence = [1,1,1,2,3,3,4,4,4]')
console.log('Expected answer: 1 2 3 4')
console.log('Actual answer: ')
while (freshList) {
    console.log(freshList.value)
    freshList = freshList.next
}

console.log('***********************************')

/*
    Given string, write algorithm to count number of words in string that are palindromes. the output must include a list of the palindromes and the number of palindromes

    - Input: `"Dad gave mom a Tesla as a racecar"`
    - Output: `Dad, mom, racecar, 3 Palindromes`

    Pseudocode:
    1. write subfunction to determine whether palindrome
    2. if palindrome, store in palindromes object
    3. return Object.keys(palindromes) + Object.keys(palindromes).length
*/

function returnPalindrome(str) {
    function isPalindrome(str) {
        for (let i = 0; i < str.length - 1 - i; i++) {
            if (str[i] !== str[str.length - 1 - i]) {
                return false
            }
        }
        return true
    }

    const words = str.split(' ')
    const palindromes = {}

    words.forEach(word => {
        if (isPalindrome(word.toLowerCase())) {
            palindromes[word] = 1
        }
    })

    let msg = ''
    Object.keys(palindromes).forEach(palindrome => {
        msg += `${palindrome}, `
    })
    msg += `${Object.keys(palindromes).length} Palindromes`
    return msg
}

console.log(`
returnPalindrome('Dad gace mom a Tesla as a racecar'):
expected: Dad, mom, racecar, 3 Palindromes
actual: ${returnPalindrome('Dad gace mom a Tesla as a racecar')}
`)

/*
    Explain how a hash table works:
*/

console.log(`
Here's how hash tables work:
`)

/*
    Given 2 linked lists, where each node in each linked list represents a character in a string, 
    write a function that compares the 2 strings: 
        0 if strings are same
        -1 if 2nd string is lexicographically greater
        1 if 1st string is lexicographically greater

    - Input: `list 1: B->i->l->b->o->a, list 2: B->i->l->b->o` 
    - Output: `1`

    - Input: `list 1: B->i->l->b->o, list 2: B->i->l->b->o`
    - Output: `0`

    - Input: `list 1: B->i->l->b->o->a, list 2: B->i->l->b->o->b` 
    - Output: `-1`
    
*/

/* Making the two linked lists */

let sequence1 = ['B','i','l','b']
let sequence2 = ['B','i','l','b']

let head1 = new _Node(1)
let curr1 = head1
sequence.forEach(num => {
    let node = new _Node(num)
    curr.next = node
    curr = curr.next;
    node.next = null
})

let linkedList1 = new LinkedList()
linkedList1.head = head1

let head2 = new _Node(1)
let curr2 = head2
sequence.forEach(num => {
    let node = new _Node(num)
    curr.next = node
    curr = curr.next;
    node.next = null
})

let linkedList2 = new LinkedList()
linkedList2.head = head2

function compareList(list1, list2) {
    let head1 = list1.head
    let head2 = list2.head
    console.log(head1, head2)

    while (head1 && head2 && head.next && head2.next) {
        console.log(head1.value, head2.value)
        head1 = head1.next;
        head2 = head2.next;
    }
    console.log(head1, head2)
    if (!head1 && head2) {
        return -1
    }
    if (head1 && !head2){
        return 1
    }
    if (head1.val === head2.val) {
        return 0
    }
    return head1.val - head2.val ? 1 : -1
}

console.log(`
    compare 2 linked list lexicographically
    compareList('Bilb', 'Bilb')
    expected: 0
    actual : ${compareList(linkedList1, linkedList2)}

    `)
    sequence1 = ['B','i','l',]
    sequence2 = ['B','i','l','b']
    
    head1 = new _Node(1)
    curr1 = head1
    sequence.forEach(num => {
        let node = new _Node(num)
        curr.next = node
        curr = curr.next;
        node.next = null
    })
    
    linkedList1 = new LinkedList()
    linkedList1.head = head1
    
    head2 = new _Node(1)
    curr2 = head2
    sequence.forEach(num => {
        let node = new _Node(num)
        curr.next = node
        curr = curr.next;
        node.next = null
    })
    
    linkedList2 = new LinkedList()
    linkedList2.head = head2
console.log(`
    compareList('Bil', 'Bilb')
    expected: -1
    actual : ${compareList(linkedList1, linkedList2)}
`)

    sequence1 = ['B','i','l','b']
    sequence2 = ['B','i','l',]

    head1 = new _Node(1)
    curr1 = head1
    sequence.forEach(num => {
        let node = new _Node(num)
        curr.next = node
        curr = curr.next;
        node.next = null
    })

    linkedList1 = new LinkedList()
    linkedList1.head = head1

    head2 = new _Node(1)
    curr2 = head2
    sequence.forEach(num => {
        let node = new _Node(num)
        curr.next = node
        curr = curr.next;
        node.next = null
    })

linkedList2 = new LinkedList()
linkedList2.head = head2
console.log(`
    compareList('Bil', 'Bilb')
    expected: 1
    actual : ${compareList(linkedList1, linkedList2)}
`)


//     compareList('Bilb', 'Bil')
//     expected: 0
//     actual : ${compareList(linkedList1, linkedList2)}

//     compareList('Bilb', 'Bilb')
//     expected: 0
//     actual : ${compareList(linkedList1, linkedList2)}
// `)

console.log(
   ` Given a list of integers find the mode and the frequency of the mode

    Input: '1, 2, 3, 6, 10, 3, 5, 6, 3, 3'
    Ouput: 'Mode = 3, Frequency of mode = 4'

    Pseudocode:
        1. create count object
        2. iterate through list update count
        3. return max count key and max count value`
)

function maxMode(numbers) {
    const count = {}
    numbers.forEach(number => {
        if (!count[number]) {
            count[number] = 1
        } else {
            count[number] = count[number] + 1
        }
    })
    const mode = Object.keys(count).reduce((acc, red) => {
        return count[acc] > count[red] ? acc : red
    })
    return `Mode = ${mode}, Frequency of mode = ${count[mode]}`
}

console.log(`
    maxMode('1, 2, 3, 6, 10, 3, 5, 6, 3, 3')
    output: ${maxMode([1, 2, 3, 6, 10, 3, 5, 6, 3, 3])}
`)
