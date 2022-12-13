package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"
)

func solve(fileScanner *bufio.Scanner) int {
	score := 0
	var line string = "nil"
	for fileScanner.Scan() && line != "" {
		line = fileScanner.Text()

		fmt.Println(line)
	}

	for fileScanner.Scan() {
		line = fileScanner.Text()
		fmt.Println("instruction ", line)
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
