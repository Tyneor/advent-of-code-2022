package main

import (
	"bufio"
	"embed"
	"fmt"
	"strconv"
)

//go:embed input.txt
var content embed.FS

func main() {
	readFile, _ := content.Open("input.txt") // no error check
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)

	// elves := []int{0}
	currentElf := 0
	max := 0

	for fileScanner.Scan() {
		if fileScanner.Text() != "" {
			calories, _ := strconv.Atoi(fileScanner.Text())
			currentElf += calories
			// elves[len(elves)-1] += calories
		} else {
			if currentElf > max {
				max = currentElf
			}
			currentElf = 0
		}
	}
	readFile.Close()
	fmt.Println(max)

}
