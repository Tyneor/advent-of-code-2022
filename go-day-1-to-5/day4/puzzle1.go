package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func sliceMap[T, U any](data []T, f func(T) (U, error)) ([]U, error) {
	res := make([]U, 0, len(data))
	var err error
	for _, el := range data {
		newEl, err := f(el)
		if err != nil {
			break
		}
		res = append(res, newEl)
	}
	return res, err
}

func isUnfairPair(numbers []int) bool {
	if numbers[0] < numbers[2] {
		return numbers[1] >= numbers[3]
	} else if numbers[2] < numbers[0] {
		return numbers[3] >= numbers[1]
	}
	return true
}

func solve(fileScanner *bufio.Scanner) int {
	unfairPairs := 0

	for fileScanner.Scan() {
		line := fileScanner.Text()
		r, _ := regexp.Compile("([0-9]*)-([0-9]*),([0-9]*)-([0-9]*)")
		numbers, _ := sliceMap(r.FindStringSubmatch(line)[1:], strconv.Atoi)

		fmt.Println(numbers, isUnfairPair(numbers))
		if isUnfairPair(numbers) {
			unfairPairs++
		}
	}

	return unfairPairs
}

//go:embed input.txt
var content embed.FS

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
