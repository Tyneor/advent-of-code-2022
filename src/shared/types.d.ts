type Solver<T> = (input: string) => T | Promise<T>;
type Day<F, S> = { firstSolve: Solver<F>; secondSolve: Solver<S> };
