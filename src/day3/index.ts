export class Record {
  raw: string;
  digits: number[];

  constructor(s: string) {
    this.raw = s;
    this.digits = s.split("").map((x) => parseInt(x));
  }

  toInt(): number {
    return parseInt(this.raw, 2);
  }
}

class Report {
  records: Record[];
  gammaRate: Record;
  epsilonRate: Record;
  oxygenGeneratorRating: Record;
  co2ScrubberRating: Record;

  constructor(records: Record[]) {
    this.records = records;

    const diag = this.analyze(records);

    this.gammaRate = diag.gammaRate;
    this.epsilonRate = diag.epsilonRate;
    this.oxygenGeneratorRating = diag.oxygenGeneratorRating;
    this.co2ScrubberRating = diag.co2ScrubberRating;
  }

  powerConsumption(): number {
    return this.gammaRate.toInt() * this.epsilonRate.toInt();
  }

  lifeSupportRating(): number {
    return this.oxygenGeneratorRating.toInt() * this.co2ScrubberRating.toInt();
  }

  private analyze(records: Record[]) {
    const noBits = records[0].digits.length;

    let gammaRateRaw = "";
    let epsilonRateRaw = "";

    let oxygenRecords = [...records];
    let oxygenGeneratorRating: Record = new Record("0");

    let co2Records = [...records];
    let co2ScrubberRating: Record = new Record("0");

    for (let i = 0; i < noBits; i++) {
      const mcb = this.mostCommonBit(records, i);
      const lcb = mcb === 0 ? 1 : 0;

      gammaRateRaw = `${gammaRateRaw}${mcb}`;
      epsilonRateRaw = `${epsilonRateRaw}${lcb}`;

      oxygenRecords = this.stepOxygenRecords(oxygenRecords, i);
      co2Records = this.stepCo2Records(co2Records, i);

      if (oxygenRecords.length === 1) {
        oxygenGeneratorRating = new Record(oxygenRecords[0].raw);
      }

      if (co2Records.length === 1) {
        co2ScrubberRating = new Record(co2Records[0].raw);
      }
    }

    const gammaRate = new Record(gammaRateRaw);
    const epsilonRate = new Record(epsilonRateRaw);

    return {
      gammaRate,
      epsilonRate,
      oxygenGeneratorRating,
      co2ScrubberRating,
    };
  }

  private stepOxygenRecords(records: Record[], col: number) {
    if (records.length > 1) {
      const mcb = this.mostCommonBit(records, col, 1);
      return records.filter((r) => r.digits[col] === mcb);
    }

    return records;
  }

  private stepCo2Records(records: Record[], col: number) {
    if (records.length > 1) {
      const lcb = this.leastCommonBit(records, col, 0);
      records = records.filter((r) => r.digits[col] === lcb);
    }

    return records;
  }

  private countBitsInCol(records: Record[], col: number) {
    return records
      .map((r) => r.digits[col])
      .reduce(
        (acc, curr) => {
          const isOne = curr === 1;
          return isOne
            ? { ones: acc.ones + 1, zeros: acc.zeros }
            : { ones: acc.ones, zeros: acc.zeros + 1 };
        },
        { ones: 0, zeros: 0 }
      );
  }

  private mostCommonBit(
    records: Record[],
    index: number,
    decider: 0 | 1 = 0
  ): 0 | 1 {
    const { ones, zeros } = this.countBitsInCol(records, index);

    if (ones === zeros) {
      return decider;
    }

    return ones > zeros ? 1 : 0;
  }

  private leastCommonBit(
    records: Record[],
    index: number,
    decider: 0 | 1 = 0
  ): 0 | 1 {
    const { ones, zeros } = this.countBitsInCol(records, index);

    if (ones === zeros) {
      return decider;
    }

    return ones > zeros ? 0 : 1;
  }
}

export function parser(s: string): Record {
  return new Record(s);
}

export function part1(records: Record[]): number {
  const report = new Report(records);
  return report.powerConsumption();
}

export function part2(records: Record[]) {
  const report = new Report(records);
  return report.lifeSupportRating();
}
