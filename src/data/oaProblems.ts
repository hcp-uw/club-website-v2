import { OAProblem } from '../interfaces/IOA';

export const OA_PROBLEMS: OAProblem[] = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    score: 100,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: `The first line contains an array of integers \`nums\` separated by spaces or comma-separated format.
The second line contains the integer \`target\`.`,
    constraints: `* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* **Only one valid answer exists.**`,
    outputFormat: `Return an array containing the two 0-based indices \`[index1, index2]\`.`,
    sampleTestCases: [
      {
        id: 'tc-1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
      },
      {
        id: 'tc-2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2].',
      },
      {
        id: 'tc-3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1].',
      },
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 'nums = [1, 5, 8, 12, 19, 25], target = 31',
        expectedOutput: '[3,4]',
        isHidden: true,
      },
      {
        id: 'htc-2',
        input: 'nums = [-3, 4, 3, 90], target = 0',
        expectedOutput: '[0,2]',
        isHidden: true,
      },
      {
        id: 'htc-3',
        input: 'nums = [11, 2, 7, 15], target = 9',
        expectedOutput: '[1,2]',
        isHidden: true,
      },
    ],
    codeTemplates: {
      python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int diff = target - nums[i];
        if (seen.find(diff) != seen.end()) {
            return {seen[diff], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}
`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
      go: `package main

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        diff := target - num
        if idx, found := seen[diff]; found {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return []int{}
}
`,
      rust: `use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let diff = target - num;
        if let Some(&prev_idx) = map.get(&diff) {
            return vec![prev_idx as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}
`,
    },
  },
  {
    id: 'valid-anagram',
    title: '2. Valid Anagram',
    difficulty: 'Easy',
    category: 'Strings',
    score: 100,
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: `The input contains two strings \`s\` and \`t\`.`,
    constraints: `* \`1 <= s.length, t.length <= 5 * 10^4\`
* \`s\` and \`t\` consist of lowercase English letters.`,
    outputFormat: `Return \`true\` or \`false\`.`,
    sampleTestCases: [
      {
        id: 'tc-1',
        input: 's = "anagram", t = "nagaram"',
        expectedOutput: 'true',
        explanation: 'Both s and t contain the letters a (3), n (1), g (1), r (1), m (1).',
      },
      {
        id: 'tc-2',
        input: 's = "rat", t = "car"',
        expectedOutput: 'false',
        explanation: 's contains t and r, but t contains c which is not in s.',
      },
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 's = "a", t = "ab"',
        expectedOutput: 'false',
        isHidden: true,
      },
      {
        id: 'htc-2',
        input: 's = "listen", t = "silent"',
        expectedOutput: 'true',
        isHidden: true,
      },
      {
        id: 'htc-3',
        input: 's = "husky", t = "yksuh"',
        expectedOutput: 'true',
        isHidden: true,
      },
    ],
    codeTemplates: {
      python: `def is_anagram(s, t):
    """
    :type s: str
    :type t: str
    :rtype: bool
    """
    if len(s) != len(t):
        return False
    
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
    for char in t:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    return True
`,
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}
`,
      typescript: `function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const count: Record<string, number> = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}
`,
      cpp: `#include <string>
#include <vector>

bool isAnagram(std::string s, std::string t) {
    if (s.length() != t.length()) return false;
    std::vector<int> count(26, 0);
    for (int i = 0; i < s.length(); ++i) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int val : count) {
        if (val != 0) return false;
    }
    return true;
}
`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counter = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counter[s.charAt(i) - 'a']++;
            counter[t.charAt(i) - 'a']--;
        }
        for (int count : counter) {
            if (count != 0) return false;
        }
        return true;
    }
}
`,
      go: `package main

func isAnagram(s string, t string) bool {
    if len(s) != len(t) { return false }
    count := make(map[rune]int)
    for _, char := range s { count[char]++ }
    for _, char := range t {
        count[char]--
        if count[char] < 0 { return false }
    }
    return true
}
`,
      rust: `pub fn is_anagram(s: String, t: String) -> bool {
    if s.len() != t.len() { return false; }
    let mut counts = [0i32; 26];
    for b in s.bytes() { counts[(b - b'a') as usize] += 1; }
    for b in t.bytes() { counts[(b - b'a') as usize] -= 1; }
    counts.iter().all(|&c| c == 0)
}
`,
    },
  },
  {
    id: 'longest-substring',
    title: '3. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    score: 150,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    inputFormat: `A single string \`s\`.`,
    constraints: `* \`0 <= s.length <= 5 * 10^4\`
* \`s\` consists of English letters, digits, symbols and spaces.`,
    outputFormat: `An integer representing the maximum length of a non-repeating substring.`,
    sampleTestCases: [
      {
        id: 'tc-1',
        input: 's = "abcabcbb"',
        expectedOutput: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        id: 'tc-2',
        input: 's = "bbbbb"',
        expectedOutput: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        id: 'tc-3',
        input: 's = "pwwkew"',
        expectedOutput: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
      },
    ],
    hiddenTestCases: [
      {
        id: 'htc-1',
        input: 's = ""',
        expectedOutput: '0',
        isHidden: true,
      },
      {
        id: 'htc-2',
        input: 's = "au"',
        expectedOutput: '2',
        isHidden: true,
      },
      {
        id: 'htc-3',
        input: 's = "dvdf"',
        expectedOutput: '3',
        isHidden: true,
      },
    ],
    codeTemplates: {
      python: `def length_of_longest_substring(s):
    """
    :type s: str
    :rtype: int
    """
    char_map = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len
`,
      javascript: `function lengthOfLongestSubstring(s) {
    let map = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        let char = s[right];
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
    let map = new Map<string, number>();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        let char = s[right];
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::unordered_map<char, int> map;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); ++right) {
        if (map.find(s[right]) != map.end() && map[s[right]] >= left) {
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
`,
      go: `package main

func lengthOfLongestSubstring(s string) int {
    lastSeen := make(map[rune]int)
    left, maxLen := 0, 0
    for right, char := range s {
        if idx, ok := lastSeen[char]; ok && idx >= left {
            left = idx + 1
        }
        lastSeen[char] = right
        if right-left+1 > maxLen {
            maxLen = right - left + 1
        }
    }
    return maxLen
}
`,
      rust: `use std::collections::HashMap;
use std::cmp::max;

pub fn length_of_longest_substring(s: String) -> i32 {
    let mut map = HashMap::new();
    let mut left = 0;
    let mut max_len = 0;
    for (right, c) in s.chars().enumerate() {
        if let Some(&prev_idx) = map.get(&c) {
            if prev_idx >= left {
                left = prev_idx + 1;
            }
        }
        map.insert(c, right);
        max_len = max(max_len, right - left + 1);
    }
    max_len as i32
}
`,
    },
  },
];
