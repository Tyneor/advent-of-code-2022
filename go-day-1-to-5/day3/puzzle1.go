// package main

// import (
// 	"bufio"
// 	"embed"
// 	"fmt"
// 	"os"

// 	mapset "github.com/deckarep/golang-set/v2"
// )

// func translateToPriority(value byte) byte {
// 	if value <= 90 {
// 		return value - 65 + 27
// 	}
// 	return value - 97 + 1
// }

// func solve(fileScanner *bufio.Scanner) int {
// 	prioritiesSum := 0

// 	for fileScanner.Scan() {
// 		line := fileScanner.Bytes()
// 		firstCompartmentSet := mapset.NewSet[byte](line[:len(line)/2]...)
// 		secondCompartmentSet := mapset.NewSet[byte](line[len(line)/2:]...)
// 		intersectingItemPriority, _ := firstCompartmentSet.Intersect(secondCompartmentSet).Pop()
// 		prioritiesSum += int(translateToPriority(intersectingItemPriority))
// 	}
// 	return prioritiesSum
// }

// //go:embed input.txt
// var content embed.FS

// func main() {
// 	readFile, err := content.Open("input.txt")
// 	if err != nil {
// 		fmt.Println(err)
// 		os.Exit(1)
// 	}
// 	fileScanner := bufio.NewScanner(readFile)
// 	fileScanner.Split(bufio.ScanLines)
// 	result := solve(fileScanner)
// 	readFile.Close()
// 	fmt.Println(result)
// }