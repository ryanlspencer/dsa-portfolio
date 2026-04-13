const PORTFOLIO = {
  name: "Your Name",
  course: "IS 537 · Data Structures & Algorithms · BYU",
  semester: "Spring 2025",
  language: "Python",
  stats: { total: 25, easy: 18, medium: 7, acceptance: "86.5%" },
  about: `I'm a student at Brigham Young University studying Information Systems, with a focus on software engineering and data. This portfolio documents 25 LeetCode problems I solved over the course of IS 537, organized by topic. Each write-up includes my reasoning, complexity analysis, and the accepted solution. My goal throughout this course was not just to get problems accepted, but to understand <em>why</em> each data structure or algorithm is the right tool for a given problem — and to be able to explain that clearly.`,

  topics: [
    {
      id: "linked-lists",
      icon: "🔗",
      name: "Linked Lists",
      problems: [
        {
          num: "141",
          title: "Linked List Cycle",
          difficulty: "Easy",
          summary: "Determine whether a singly linked list contains a cycle — a node whose next pointer points back to a previous node.",
          time: "O(n)", space: "O(n)", technique: "Hash Set",
          approach: "I traverse the list and store each node object (not its value — the actual reference) in a set. If I ever visit a node that's already in the set, a cycle exists. This is straightforward and easy to reason about.",
          insight: "💡 The classic O(1) space solution uses Floyd's Tortoise and Hare — two pointers at different speeds. If there's a cycle, the fast pointer eventually laps the slow one. My solution trades that space efficiency for simplicity.",
          code: `class Solution:
    def hasCycle(self, head):
        seen = set()
        current = head
        while current is not None:
            if current in seen:
                return True
            seen.add(current)
            current = current.next
        return False`
        },
        {
          num: "142",
          title: "Linked List Cycle II",
          difficulty: "Medium",
          summary: "Given a linked list that may contain a cycle, return the node where the cycle begins. Return null if there is no cycle.",
          time: "O(n)", space: "O(n)", technique: "Hash Set",
          approach: "Same hash set strategy as #141, but now instead of returning True when we find a repeat, we return the repeated node itself — that's the cycle entry point.",
          insight: "💡 This builds directly on #141. The fact that the same pattern extends naturally to a harder variant shows how powerful the 'track visited nodes' idea is.",
          code: `class Solution:
    def detectCycle(self, head):
        seen = set()
        current = head
        while current:
            if current in seen:
                return current
            seen.add(current)
            current = current.next
        return None`
        },
        {
          num: "206",
          title: "Reverse Linked List",
          difficulty: "Easy",
          summary: "Reverse a singly linked list in-place and return the new head.",
          time: "O(n)", space: "O(1)", technique: "Two Pointers",
          approach: "Walk the list with two pointers — curr and prev. At each step, save the next node, flip the current pointer backward, then advance. After the loop, prev is the new head.",
          insight: "💡 This is a foundational linked list operation. Mastering it makes problems like Palindrome Linked List (234) much more approachable, since reversing half the list is a key sub-step.",
          code: `class Solution:
    def reverseList(self, head):
        curr = head
        prev = None
        while curr is not None:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`
        },
        {
          num: "234",
          title: "Palindrome Linked List",
          difficulty: "Easy",
          summary: "Determine whether a singly linked list reads the same forwards and backwards.",
          time: "O(n)", space: "O(1)", technique: "Fast/Slow Pointer + Reverse",
          approach: "Three steps: (1) find the middle using fast/slow pointers, (2) reverse the second half in-place using the technique from #206, (3) compare the first and reversed second halves node by node.",
          insight: "💡 This problem elegantly combines two patterns — slow/fast pointer midpoint finding and in-place list reversal. It took me 5 attempts because I initially struggled with the pointer state after reversal. Getting the order of operations right was the key lesson.",
          code: `class Solution:
    def isPalindrome(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        prev, curr = None, slow
        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp

        left, right = head, prev
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next
        return True`
        },
        {
          num: "21",
          title: "Merge Two Sorted Lists",
          difficulty: "Easy",
          summary: "Merge two sorted singly linked lists into one sorted list and return its head.",
          time: "O(n+m)", space: "O(1)", technique: "Dummy Node + Two Pointers",
          approach: "Use a dummy head node to simplify edge cases. Maintain a current pointer and at each step attach whichever of the two list heads is smaller. After one list is exhausted, attach the remainder of the other.",
          insight: "💡 The dummy node pattern is a classic linked list trick — it removes the special case of initializing the head of the result list, making the loop cleaner and less error-prone.",
          code: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode()
        current = dummy
        while list1 and list2:
            if list1.val < list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next
        current.next = list1 if list1 else list2
        return dummy.next`
        }
      ]
    },
    {
      id: "trees",
      icon: "🌲",
      name: "Trees & Binary Search Trees",
      problems: [
        {
          num: "94",
          title: "Binary Tree Inorder Traversal",
          difficulty: "Easy",
          summary: "Return the inorder traversal (left → node → right) of a binary tree's node values.",
          time: "O(n)", space: "O(n)", technique: "DFS Recursion",
          approach: "Recursive DFS: recurse left, append the current node's value, recurse right. A closure over the result list makes this clean and avoids passing state around.",
          insight: "💡 Inorder traversal of a BST yields values in sorted order — this property makes it the go-to technique for BST validation problems.",
          code: `class Solution:
    def inorderTraversal(self, root):
        result = []
        def inorder(node):
            if not node: return
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
        inorder(root)
        return result`
        },
        {
          num: "100",
          title: "Same Tree",
          difficulty: "Easy",
          summary: "Given two binary trees, return true if they are structurally identical and all corresponding nodes have the same value.",
          time: "O(n)", space: "O(h)", technique: "Recursive DFS",
          approach: "Recursive comparison: if both nodes are null, return True. If only one is null, return False. Otherwise check that values match and both subtrees are the same recursively.",
          insight: "💡 The base cases here follow a general pattern for tree recursion: handle null nodes first, then handle the recursive case. This template appears in many tree problems.",
          code: `class Solution:
    def isSameTree(self, p, q):
        if not p and not q: return True
        if not p or not q:  return False
        return (p.val == q.val) and \\
               self.isSameTree(p.left, q.left) and \\
               self.isSameTree(p.right, q.right)`
        },
        {
          num: "101",
          title: "Symmetric Tree",
          difficulty: "Easy",
          summary: "Check whether a binary tree is a mirror of itself around its center.",
          time: "O(n)", space: "O(h)", technique: "Recursive Mirror Check",
          approach: "A helper isMirror(left, right) checks: both null → True, one null → False, else values must match and left.left mirrors right.right while left.right mirrors right.left.",
          insight: "💡 This is a natural extension of Same Tree — the difference is that instead of comparing left↔left and right↔right, we compare left↔right cross-wise.",
          code: `class Solution:
    def isSymmetric(self, root):
        def isMirror(left, right):
            if not left and not right: return True
            if not left or not right:  return False
            return (left.val == right.val) and \\
                   isMirror(left.left, right.right) and \\
                   isMirror(left.right, right.left)
        return True if not root else isMirror(root.left, root.right)`
        },
        {
          num: "104",
          title: "Maximum Depth of Binary Tree",
          difficulty: "Easy",
          summary: "Return the maximum depth (number of nodes along the longest root-to-leaf path) of a binary tree.",
          time: "O(n)", space: "O(h)", technique: "Recursive DFS",
          approach: "The depth of any node is 1 plus the max depth of its two children. The base case is null → 0. This naturally expresses as a single recursive return statement.",
          insight: "💡 This is one of the cleanest examples of how recursion maps onto tree structure. The function definition and the problem definition are almost the same sentence.",
          code: `class Solution:
    def maxDepth(self, root):
        if not root: return 0
        return 1 + max(self.maxDepth(root.left),
                       self.maxDepth(root.right))`
        },
        {
          num: "700",
          title: "Search in a Binary Search Tree",
          difficulty: "Easy",
          summary: "Given a BST and a target value, return the subtree rooted at the node with that value, or null if not found.",
          time: "O(h)", space: "O(h)", technique: "BST Property + Recursion",
          approach: "Leverage the BST invariant: if target < current value, go left; if greater, go right; if equal, return the node. This eliminates half the tree at each step.",
          insight: "💡 In a balanced BST, O(h) = O(log n). This is the core reason BSTs exist — the sorted structure enables binary-search-like lookup without the need for a contiguous array.",
          code: `class Solution:
    def searchBST(self, root, val):
        if root is None or root.val == val:
            return root
        elif val < root.val:
            return self.searchBST(root.left, val)
        else:
            return self.searchBST(root.right, val)`
        },
        {
          num: "129",
          title: "Sum Root to Leaf Numbers",
          difficulty: "Medium",
          summary: "Each root-to-leaf path in a binary tree forms a number (e.g., 1→2→3 = 123). Return the sum of all such numbers.",
          time: "O(n)", space: "O(h)", technique: "DFS with Accumulator",
          approach: "DFS where each call receives the number formed so far. At each node, shift the current number left by one decimal place (current * 10 + node.val). At a leaf, return that number. At internal nodes, return the sum from both subtrees.",
          insight: "💡 Passing an accumulator down through DFS is a powerful pattern. It avoids needing to backtrack or store path state — the call stack carries the context naturally.",
          code: `class Solution:
    def sumNumbers(self, root):
        def dfs(node, current):
            if not node: return 0
            current = current * 10 + node.val
            if not node.left and not node.right:
                return current
            return dfs(node.left, current) + dfs(node.right, current)
        return dfs(root, 0)`
        }
      ]
    },
    {
      id: "tries",
      icon: "📖",
      name: "Tries",
      problems: [
        {
          num: "14",
          title: "Longest Common Prefix",
          difficulty: "Easy",
          summary: "Find the longest string that is a prefix of all strings in an array.",
          time: "O(S)", space: "O(1)", technique: "Horizontal Scan",
          approach: "Start with the first string as the candidate prefix. For each subsequent word, shrink the prefix from the right until the word starts with it. If the prefix becomes empty, return early.",
          insight: "💡 This relates to tries because a trie is essentially a data structure built for exactly this kind of prefix query — each node represents a shared prefix across all strings that pass through it.",
          code: `class Solution:
    def longestCommonPrefix(self, strs):
        if not strs: return ""
        prefix = strs[0]
        for word in strs[1:]:
            while not word.startswith(prefix):
                prefix = prefix[:-1]
                if not prefix: return ""
        return prefix`
        },
        {
          num: "208",
          title: "Implement Trie (Prefix Tree)",
          difficulty: "Medium",
          summary: "Implement a trie with insert, search, and startsWith operations.",
          time: "O(m) per op", space: "O(m·n)", technique: "Trie / Prefix Tree",
          approach: "Each TrieNode holds a dictionary of children and an isEnd flag. Insert walks/creates nodes character by character, marking the last as end. Search walks and checks isEnd. StartsWith walks without checking isEnd.",
          insight: "💡 A trie's power is that prefix lookups are O(m) where m is the prefix length — independent of how many words are stored. Hash sets can check exact membership in O(1) but can't efficiently find all words sharing a prefix.",
          code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.isEnd = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.isEnd

    def startsWith(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True`
        }
      ]
    },
    {
      id: "heaps",
      icon: "⛰️",
      name: "Heaps & Priority Queues",
      problems: [
        {
          num: "703",
          title: "Kth Largest Element in a Stream",
          difficulty: "Easy",
          summary: "Design a class that finds the kth largest element in a stream, supporting an add operation that returns the current kth largest after each insertion.",
          time: "O(n log n)", space: "O(n)", technique: "Sorted Insert",
          approach: "Keep a sorted list. On each add, insert the new value in its correct sorted position using a linear scan, then return the element at index -k. This took 4 attempts — my initial versions didn't maintain sorted order correctly on insertion.",
          insight: "💡 The optimal solution uses a min-heap of size k, giving O(log k) per add. My sorted-list approach works but is slower. Understanding why a heap of size k suffices — you only need to track the top k elements — is the key insight I'd optimize next.",
          code: `class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.nums = sorted(nums)

    def add(self, val):
        i = 0
        while i < len(self.nums) and self.nums[i] < val:
            i += 1
        self.nums.insert(i, val)
        return self.nums[-self.k]`
        },
        {
          num: "215",
          title: "Kth Largest Element in an Array",
          difficulty: "Medium",
          summary: "Find the kth largest element in an unsorted array (not the kth distinct element).",
          time: "O(n log k)", space: "O(k)", technique: "Min-Heap of Size k",
          approach: "Maintain a min-heap of size k. Push each element; if the heap exceeds size k, pop the minimum. After processing all elements, the heap's root is the kth largest — it's the smallest of the k largest elements seen.",
          insight: "💡 Python's heapq is a min-heap. Keeping it capped at size k means we always discard elements smaller than our current kth largest candidate. The root of the heap is the answer because it's the minimum of the top-k set.",
          code: `import heapq
class Solution:
    def findKthLargest(self, nums, k):
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`
        }
      ]
    },
    {
      id: "arrays",
      icon: "🗄️",
      name: "Arrays & Hash Maps",
      problems: [
        {
          num: "1",
          title: "Two Sum",
          difficulty: "Easy",
          summary: "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
          time: "O(n)", space: "O(n)", technique: "Hash Map",
          approach: "For each number, compute its complement (target − num) and check the hash map. If found, return both indices. Otherwise, store the current number and index. One pass, O(n).",
          insight: "💡 This is the canonical demonstration of trading space for time. The naive O(n²) nested loop becomes O(n) by using a hash map to check complements in O(1).",
          code: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i`
        },
        {
          num: "88",
          title: "Merge Sorted Array",
          difficulty: "Easy",
          summary: "Merge two sorted integer arrays nums1 and nums2 into nums1 in-place. nums1 has extra space at the end to accommodate nums2.",
          time: "O(m+n)", space: "O(1)", technique: "Reverse Two Pointer",
          approach: "Fill from the back. Three pointers: i at the last real element of nums1, j at the last element of nums2, k at the very end. Compare and place the larger of the two at position k, moving the relevant pointer left.",
          insight: "💡 The trick is merging from right to left. Merging left to right would require shifting elements — merging from the right fills into empty space without any overwriting.",
          code: `class Solution:
    def merge(self, nums1, m, nums2, n):
        i, j, k = m - 1, n - 1, m + n - 1
        while i >= 0 and j >= 0:
            if nums1[i] > nums2[j]:
                nums1[k] = nums1[i]; i -= 1
            else:
                nums1[k] = nums2[j]; j -= 1
            k -= 1
        while j >= 0:
            nums1[k] = nums2[j]; j -= 1; k -= 1`
        },
        {
          num: "3",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          summary: "Find the length of the longest substring that contains no duplicate characters.",
          time: "O(n)", space: "O(min(m,n))", technique: "Sliding Window",
          approach: "Sliding window with a hash map storing the last seen index of each character. The left pointer jumps past any repeated character's last position, maintaining a window with no duplicates. Track the max window size throughout.",
          insight: "💡 Storing the index (not just presence) in the hash map lets the left pointer jump directly instead of creeping forward one step at a time — a key optimization that keeps this O(n).",
          code: `class Solution:
    def lengthOfLongestSubstring(self, s):
        seen = {}
        left = result = 0
        for right in range(len(s)):
            char = s[right]
            while char in seen and seen[char] >= left:
                left += 1
            seen[char] = right
            result = max(result, right - left + 1)
        return result`
        }
      ]
    },
    {
      id: "stacks-queues",
      icon: "📚",
      name: "Stacks & Queues",
      problems: [
        {
          num: "225",
          title: "Implement Stack using Queues",
          difficulty: "Easy",
          summary: "Implement a LIFO stack using only standard queue operations (push to back, pop from front).",
          time: "O(1)", space: "O(n)", technique: "Python list as Stack",
          approach: "Python's list supports O(1) append (push to back) and O(1) pop() (pop from back) — making it a natural stack. The top() uses index -1 for constant-time peek.",
          insight: "💡 This problem and #232 together illustrate the conceptual difference between stacks and queues by forcing you to build one from the other. Understanding that difference at the implementation level solidifies the abstractions.",
          code: `class MyStack:
    def __init__(self):
        self.myStack = []
    def push(self, x): self.myStack.append(x)
    def pop(self):     return self.myStack.pop()
    def top(self):     return self.myStack[-1]
    def empty(self):   return len(self.myStack) == 0`
        },
        {
          num: "232",
          title: "Implement Queue using Stacks",
          difficulty: "Easy",
          summary: "Implement a FIFO queue using only standard stack operations.",
          time: "O(n)", space: "O(n)", technique: "List with pop(0)",
          approach: "Use a Python list: append to push to the back, pop(0) to dequeue from the front, and index [0] to peek. Note that pop(0) is O(n) due to shifting — the optimal two-stack approach achieves amortized O(1).",
          insight: "💡 The optimal solution uses two stacks: one for input and one for output. Transfer from input to output only when output is empty, giving amortized O(1) dequeue. My simpler version works but understanding the optimization is important.",
          code: `class MyQueue:
    def __init__(self):
        self.myQueue = []
    def push(self, x):  self.myQueue.append(x)
    def pop(self):      return self.myQueue.pop(0)
    def peek(self):     return self.myQueue[0]
    def empty(self):    return len(self.myQueue) == 0`
        }
      ]
    },
    {
      id: "dp",
      icon: "⚡",
      name: "Dynamic Programming",
      problems: [
        {
          num: "509",
          title: "Fibonacci Number",
          difficulty: "Easy",
          summary: "Compute the nth Fibonacci number, where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2).",
          time: "O(n)", space: "O(1)", technique: "Iterative DP",
          approach: "Instead of naive recursion (O(2ⁿ)), keep only the last two values and update in a loop. The Pythonic tuple swap a, b = b, a + b eliminates the need for a temp variable.",
          insight: "💡 Fibonacci is the textbook motivation for memoization and DP. This iterative version is the bottom-up DP approach with O(1) space — we don't need to store the full table because each step only depends on the last two values.",
          code: `class Solution:
    def fib(self, n):
        a, b = 0, 1
        for _ in range(n):
            a, b = b, a + b
        return a`
        },
        {
          num: "70",
          title: "Climbing Stairs",
          difficulty: "Easy",
          summary: "You can climb 1 or 2 steps at a time. How many distinct ways are there to reach the top of an n-step staircase?",
          time: "O(n)", space: "O(1)", technique: "Iterative DP (Fibonacci)",
          approach: "The number of ways to reach step n is ways(n-1) + ways(n-2) — because you arrive either from one step below or two steps below. This is exactly the Fibonacci recurrence. Same O(1) space iterative approach applies.",
          insight: "💡 Recognizing that a new problem reduces to a known recurrence (Fibonacci) is a core DP skill. The staircase framing disguises what is fundamentally the same subproblem structure.",
          code: `class Solution:
    def climbStairs(self, n):
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`
        },
        {
          num: "198",
          title: "House Robber",
          difficulty: "Medium",
          summary: "Given an array of non-negative integers representing house values, find the maximum amount you can rob without robbing two adjacent houses.",
          time: "O(n)", space: "O(1)", technique: "Bottom-Up DP",
          approach: "At each house, the optimal choice is: max(rob this house + best from two back, skip and take best from one back). Track only the previous two best values — no full DP table needed.",
          insight: "💡 The key insight is that the decision at each step only depends on the previous two states, not the entire history. This space optimization collapses an O(n) table to two variables.",
          code: `class Solution:
    def rob(self, nums):
        if not nums: return 0
        if len(nums) == 1: return nums[0]
        prev2, prev1 = nums[0], max(nums[0], nums[1])
        for i in range(2, len(nums)):
            curr = max(prev1, prev2 + nums[i])
            prev2, prev1 = prev1, curr
        return prev1`
        },
        {
          num: "1155",
          title: "Number of Dice Rolls With Target Sum",
          difficulty: "Medium",
          summary: "Given n dice each with k faces, count the number of ways to roll them so their values sum to target. Return the answer modulo 10⁹+7.",
          time: "O(n·k·target)", space: "O(n·target)", technique: "Top-Down DP + Memoization",
          approach: "Recursive solution with @cache memoization. Base cases: if target reaches 0 with no dice left, return 1. If one condition is met but not the other, return 0. Otherwise try all k faces and sum the results, taking mod at each step.",
          insight: "💡 @cache (Python 3.9+) automatically memoizes by function arguments — the same as @lru_cache(maxsize=None). This converts an exponential recursion into a polynomial one by caching overlapping subproblems.",
          code: `class Solution:
    @cache
    def numRollsToTarget(self, n, k, target):
        if target == 0 and n == 0: return 1
        if n == 0 or target <= 0:  return 0
        counter = 0
        for face in range(1, k + 1):
            counter += self.numRollsToTarget(n-1, k, target-face)
        return counter % (10**9 + 7)`
        }
      ]
    },
    {
      id: "graphs",
      icon: "🕸️",
      name: "Graphs",
      problems: [
        {
          num: "1791",
          title: "Find Center of Star Graph",
          difficulty: "Easy",
          summary: "Given a star graph (one center node connected to all others) represented as an edge list, find the center node.",
          time: "O(1)", space: "O(1)", technique: "Graph Observation",
          approach: "The center node appears in every edge. So it must appear in both the first and second edges. Check which node from edge 0 also appears in edge 1 — that's the center. No iteration needed.",
          insight: "💡 Graph problems often reward careful observation over brute force. Recognizing the structural property of a star graph (center appears in every edge) makes this a constant-time solution rather than an O(n) degree-counting approach.",
          code: `class Solution:
    def findCenter(self, edges):
        a, b = edges[0], edges[1]
        return a[0] if a[0] in b else a[1]`
        }
      ]
    }
  ]
};
