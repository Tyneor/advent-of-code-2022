package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"

	mapset "github.com/deckarep/golang-set/v2"
)

func translateToPriority(value byte) int {
	if value <= 90 {
		return int(value - 65 + 27)
	}
	return int(value - 97 + 1)
}

func getGroupIntersection(group []mapset.Set[byte]) int {
	res, _ := group[0].Intersect(group[1]).Intersect(group[2]).Pop()
	fmt.Println(string(res))
	return translateToPriority(res)
}

func solve(fileScanner *bufio.Scanner) int {
	prioritiesSum := 0
	group := []mapset.Set[byte]{}

	for fileScanner.Scan() {
		if len(group) >= 3 {
			prioritiesSum += getGroupIntersection(group)
			group = group[:0]
		}
		group = append(group, mapset.NewSet[byte](fileScanner.Bytes()...))
	}
	prioritiesSum += getGroupIntersection(group)
	return prioritiesSum
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
