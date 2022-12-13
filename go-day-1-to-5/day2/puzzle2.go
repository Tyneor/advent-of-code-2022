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

func matchScore(ourPlay string, theirPlay int) int {
	if ourPlay == "X" {
		if theirPlay-1 == 0 {
			return 3
		}
		return 0 + theirPlay - 1
	}
	if ourPlay == "Y" {
		return 3 + theirPlay
	}
	return 6 + (theirPlay % 3) + 1
}

func solve(fileScanner *bufio.Scanner) int {
	score := 0

	for fileScanner.Scan() {
		match := strings.Split(fileScanner.Text(), " ")
		theirs, ours := int(match[0][0])-64, match[1]
		score += matchScore(ours, theirs)

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
