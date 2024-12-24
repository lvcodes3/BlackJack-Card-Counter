class Player {
  private name: string;
  private bankroll: number;
  private bet: number = 0;
  private hand: number[] = [];
  private runningCount: number = 0;
  private trueCount: number = 0;

  constructor(name: string, bankroll: number = 5000) {
    this.name = name;
    this.bankroll = bankroll;
  }

  /**
   * MAIN
   */

  placeBet(): void {
    // use the true count to determine the bet amount //
    let bet: number;

    // neg to 0 //
    if (this.trueCount <= 0) {
      bet = 50;
    }
    // 1 - 5 //
    else if (this.trueCount > 0 && this.trueCount < 6) {
      bet = 100;
    }
    // 6 - 10 //
    else if (this.trueCount > 5 && this.trueCount < 11) {
      bet = 150;
    }
    // 11 or more //
    else {
      bet = 200;
    }

    if (bet > this.bankroll) {
      throw new Error("Insufficient bankroll!");
    }

    this.bet = bet;
    this.bankroll -= bet;
  }

  receiveCard(card: number, remainingCards: number): void {
    this.hand.push(card);
    this.updateRunningCount(card);
    this.updateTrueCount(remainingCards);
  }

  private updateRunningCount(card: number): void {
    // High - Low //
    if (card >= 2 && card <= 6) this.runningCount++;
    else if (card === 1 || card >= 10) this.runningCount--;
  }

  private updateTrueCount(remainingCards: number): void {
    // calculate remaining decks //
    const remainingDecks = remainingCards / 52;

    // avoid dividing by zero //
    if (remainingDecks === 0) {
      this.trueCount = this.runningCount;
    }
    // true count = running count / remaining decks //
    else {
      this.trueCount = Math.round(this.runningCount / remainingDecks);
    }
  }

  adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  resetHand(): void {
    this.hand = [];
    this.runningCount = 0;
    this.trueCount = 0;
  }

  /**
   * GETTERS
   */

  getName(): string {
    return this.name;
  }

  getBankroll(): number {
    return this.bankroll;
  }

  getBet(): number {
    return this.bet;
  }

  getHand(): string {
    return JSON.stringify(this.hand);
  }

  getHandTotal(): number {
    return this.hand.reduce((sum, card) => sum + (card > 10 ? 10 : card), 0);
  }

  getRunningCount(): number {
    return this.runningCount;
  }

  getTrueCount(): number {
    return this.trueCount;
  }

  getStats(): void {
    console.log(`Player: ${this.name} Bankroll: ${this.bankroll}\n`);
  }
}

export default Player;
