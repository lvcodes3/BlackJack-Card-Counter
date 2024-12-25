class Player {
  private name: string;
  private bankroll: number;
  private bet: number = 0;
  private hand: number[] = [];

  constructor(name: string, bankroll: number = 5000) {
    this.name = name;
    this.bankroll = bankroll;
  }

  /**
   * MAIN FUNCTIONALITIES
   */

  public placeBet(trueCount: number): number {
    // use the true count to determine the bet amount //
    let bet: number;

    // neg to 0 //
    if (trueCount <= 0) {
      bet = 50;
    }
    // 1 - 5 //
    else if (trueCount > 0 && trueCount < 6) {
      bet = 100;
    }
    // 6 - 10 //
    else if (trueCount > 5 && trueCount < 11) {
      bet = 150;
    }
    // 11 or more //
    else {
      bet = 200;
    }

    if (bet > this.bankroll) {
      throw new Error("Insufficient bankroll!");
    }

    this.bankroll -= bet;

    return (this.bet = bet);
  }

  public receiveCard(card: number): void {
    this.hand.push(card);
  }

  public adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  public resetHand(): void {
    this.hand = [];
  }

  /**
   * GETTERS
   */

  public getName(): string {
    return this.name;
  }

  public getBankroll(): number {
    return this.bankroll;
  }

  public getBet(): number {
    return this.bet;
  }

  public getHand(): string {
    return JSON.stringify(this.hand);
  }

  public getHandTotal(): number {
    return this.hand.reduce((sum, card) => sum + (card > 10 ? 10 : card), 0);
  }

  public getStats(): void {
    console.log(`Player: ${this.name} Bankroll: ${this.bankroll}\n`);
  }
}

export default Player;
