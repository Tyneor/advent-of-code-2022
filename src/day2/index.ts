type Opponent = "A" | "B" | "C";
type Player = "X" | "Y" | "Z";

const computeFinalScore = (input: string[], baseComputer: (player: Player) => number, matchComputer: (opponent: Opponent, player: Player) => number) => {
  const scores = input.map((line) => line.split(" ")).map((match) => baseComputer(match[1] as any) + matchComputer(match[0] as any, match[1] as any));
  return scores.reduce((sum, score) => sum + score);
};

export default {
  firstSolve: (input) => {
    const computeBaseScore = (player: Player) => (player === "X" ? 1 : player === "Y" ? 2 : 3);

    const computeMatchScore = (opponent: Opponent, player: Player) => {
      if (opponent === "A") return player === "X" ? 3 : player === "Y" ? 6 : 0;
      if (opponent === "B") return player === "X" ? 0 : player === "Y" ? 3 : 6;
      return player === "X" ? 6 : player === "Y" ? 0 : 3;
    };

    return computeFinalScore(input.split("\n"), computeBaseScore, computeMatchScore);
  },

  secondSolve: (input) => {
    const computeBaseScore = (player: Player) => (player === "X" ? 0 : player === "Y" ? 3 : 6);

    const computeMatchScore = (opponent: Opponent, player: Player) => {
      if (opponent === "A") return player === "X" ? 3 : player === "Y" ? 1 : 2;
      if (opponent === "B") return player === "X" ? 1 : player === "Y" ? 2 : 3;
      return player === "X" ? 2 : player === "Y" ? 3 : 1;
    };

    return computeFinalScore(input.split("\n"), computeBaseScore, computeMatchScore);
  },
} satisfies Day<number, number>;
