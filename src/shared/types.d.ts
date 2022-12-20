type Solver<T> = (input: string) => T;
type Day<F, S> = { firstSolve: Solver<F>; secondSolve: Solver<S> };
