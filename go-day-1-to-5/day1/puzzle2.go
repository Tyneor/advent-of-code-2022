package main

import (
	"bufio"
	"embed"
	"fmt"
	"strconv"
)

//go:embed input.txt
var content embed.FS

func getNexMaxes(maxes [3]int, currentElf int) [3]int {
	if currentElf > maxes[0] {
		return [3]int{currentElf, maxes[0], maxes[1]}
	} else if currentElf > maxes[1] {
		return [3]int{maxes[0], currentElf, maxes[1]}
	} else if currentElf > maxes[2] {
		return [3]int{maxes[0], maxes[1], currentElf}
	}
	return maxes

	// cool way
	// newMaxes := []int{maxes[0], maxes[1], maxes[2], currentElf}
	// sort.SliceStable(newMaxes, func(i, j int) bool { return newMaxes[i] > newMaxes[j] })
	// return *(*[3]int)(newMaxes)
}

func main() {
	readFile, _ := content.Open("input.txt") // no error check
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)

	currentElf := 0
	maxes := [3]int{0, 0, 0}

	for fileScanner.Scan() {
		if fileScanner.Text() != "" {
			calories, _ := strconv.Atoi(fileScanner.Text())
			currentElf += calories
		} else {
			maxes = getNexMaxes(maxes, currentElf)
			currentElf = 0
		}
	}
	readFile.Close()
	maxes = getNexMaxes(maxes, currentElf)
	fmt.Println(maxes, maxes[0]+maxes[1]+maxes[2])

}
