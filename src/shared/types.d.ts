type Solver<T extends number | string> = (input: string[]) => T;
type NumberDay = { firstSolve: Solver<number>; secondSolve: Solver<number> };
type StringDay = { firstSolve: Solver<string>; secondSolve: Solver<string> };
type Day = NumberDay | StringDay;
