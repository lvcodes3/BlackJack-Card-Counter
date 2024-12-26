import Person from "./Person";

class Player extends Person {
  private name: string;
  private bet: number = 0;

  constructor(name: string, bankroll: number = 5000) {
    super(bankroll);
    this.name = name;
  }

  public placeBet(trueCount: number): number {
    // use the true count to determine the bet amount //
    let bet: number;
    if (trueCount <= 0) {
      bet = 50;
    } else if (trueCount >= 1 && trueCount <= 5) {
      bet = 100;
    } else if (trueCount >= 6 && trueCount <= 10) {
      bet = 150;
    } else {
      bet = 200;
    }

    // ensure a bet is placed, if possible //
    bet = Math.min(bet, this.bankroll);

    if (bet === 0) {
      throw new Error("Insufficient bankroll!");
    }

    // deduct bet from bankroll //
    this.bankroll -= bet;

    // set & return bet //
    this.bet = bet;
    return bet;
  }

  /**
   * GETTERS (inherited from Person)
   */

  public getName(): string {
    return this.name;
  }

  public getBet(): number {
    return this.bet;
  }
}

export default Player;
