package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"
)

func solve(fileScanner *bufio.Scanner) int {
	score := 0

	for fileScanner.Scan() {
		fileScanner.Text()
	}

	return score
}

//go:embed example.txt
var content embed.FS

func main() {
	readFile, err := content.Open("example.txt")
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
