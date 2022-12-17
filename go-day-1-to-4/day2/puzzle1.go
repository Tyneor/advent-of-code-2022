package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"
	"strings"
)

//go:embed input.txt
var content embed.FS

func outcome(ourPlay int, theirPlay int) int {
	if ((ourPlay + 1) % 3) == theirPlay {
		return 0
	}
	if ourPlay == theirPlay {
		return 3
	}
	return 6
}

func solve(fileScanner *bufio.Scanner) int {
	score := 0

	// scoreMap := map[string]int{
	// 	"A X": 1 + 3,
	// 	"A Y": 2 + 6,
	// 	"A Z": 3 + 0,
	// 	"B X": 1 + 0,
	// 	"B Y": 2 + 3,
	// 	"B Z": 3 + 6,
	// 	"C X": 1 + 6,
	// 	"C Y": 2 + 0,
	// 	"C Z": 3 + 3,
	// }

	for fileScanner.Scan() {
		// score += scoreMap[fileScanner.Text()]
		match := strings.Split(fileScanner.Text(), " ")
		theirs, ours := int(match[0][0])-65, int(match[1][0])-88
		score += ours + 1 + outcome(ours, theirs)

	}
	return score
}

func main() {
	readFile, err := content.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)
	result := solve(fileScanner)
	readFile.Close()
	fmt.Println(result)
}
