## Commands

- While solving a problem: `pnpm debug <dayIndex> -t <first|second>`
- To solve a problem once: `pnpm solve <dayIndex> <puzzleIndex (1 or 2)>`

## Dependencies

- `typescript` and `@types/nodes` you should know why they are there
- `nodemon` an `ts-node` are used to have a debug mode
- `vitest` is used for testing the code
- `@swc/core`, `@swc/helpers` and `regenerator-runtime` are used to speed up ts-node compile time
