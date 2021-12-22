class Board {
  board: number[];
  hits: boolean[];
  result?: number;

  constructor(input: string) {
    const rows = input.split("\n").flatMap((s) =>
      s
        .trim()
        .split(/\s+/)
        .flatMap((x) => parseInt(x))
    );

    this.board = rows;
    this.hits = this.board.map((_) => false);
  }

  match(draw: number): boolean {
    if (this.board.includes(draw)) {
      const i = this.board.indexOf(draw);
      this.hits[i] = true;

      this.printState();

      const isWin = this.hasWon();

      if (isWin) {
        const unmarkedNos = this.board.filter((_, i) => !this.hits[i]);

        const unmarked = unmarkedNos.reduce((acc, curr) => acc + curr, 0);

        this.result = draw * unmarked;
      }

      return isWin;
    }

    return false;
  }

  private hasWon() {
    // winning rows
    const hitRows = this.rows(this.hits);
    const hasRowWon = hitRows
      .map((r) => r.every((x) => x === true))
      .reduce((acc, curr) => acc || curr, false);

    if (hasRowWon) {
      return true;
    }

    // winning cols
    const hitCols = this.cols(this.hits);

    const hasColWon = hitCols
      .map((r) => r.every((x) => x === true))
      .reduce((acc, curr) => acc || curr, false);

    if (hasColWon) {
      return true;
    }

    return false;
  }

  private printState() {
    const state = [...this.board].map((_) => "");
    this.hits.forEach((isHit, i) => {
      if (isHit) {
        state[i] = `${this.board[i]}`;
      }
    });
  }

  private rows(input: any[], size = 5) {
    const chunks = [];
    for (let i = 0; i < input.length; i += size) {
      chunks.push(input.slice(i, i + size));
    }

    return chunks;
  }

  private cols(input: any[], size = 5) {
    const chunks: any[][] = [];
    for (let col = 0; col < size; col++) {
      for (let i = col; i < input.length; i += size) {
        if (!chunks[col]) {
          chunks[col] = [];
        }

        chunks[col].push(input[i]);
      }
    }

    return chunks;
  }
}

class Bingo {
  drawable: number[];
  boards: Board[];
  isOver = false;
  result?: number;

  constructor(input: string) {
    const parts = input.split("\n\n");

    this.drawable = parts[0].split(",").map((x) => parseInt(x));
    this.boards = parts.slice(1).map((b) => new Board(b));
  }

  isRunning() {
    return !this.isOver;
  }

  draw() {
    const pick = this.drawable[0];
    this.drawable = this.drawable.slice(1);

    if (this.drawable.length === 0) {
      this.isOver = true;
    }

    return pick;
  }

  play(draw: number) {
    this.boards.forEach((board) => {
      const hasWon = board.match(draw);

      if (hasWon) {
        this.isOver = true;
        this.result = board.result;
      }
    });
  }
}
export function part1(input: string) {
  const bingo = new Bingo(input);

  do {
    const pick = bingo.draw();
    bingo.play(pick);
  } while (bingo.isRunning());

  return bingo.result;
}

export function part2(input: string) {
  new Bingo(input);
}
