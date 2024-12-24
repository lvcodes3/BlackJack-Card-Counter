class Player {
  private name: string;
  private bankroll: number;
  private currentBet: number = 0;
  private hand: number[] = [];
  private runningCount: number = 0;

  constructor(name: string, bankroll: number = 5000) {
    this.name = name;
    this.bankroll = bankroll;
  }

  placeBet(remainingCards: number): void {
    // use the true count to determine the bet amount //
    const trueCount = this.getTrueCount(remainingCards);

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

    this.currentBet = bet;
    this.bankroll -= bet;
  }

  receiveCard(card: number): void {
    this.hand.push(card);
    this.updateRunningCount(card);
  }

  private updateRunningCount(card: number): void {
    // High - Lo //
    if (card >= 2 && card <= 6) this.runningCount++;
    else if (card === 1 || card >= 10) this.runningCount--;
  }

  adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  resetHand(): void {
    this.hand = [];
  }

  getName(): string {
    return this.name;
  }

  getBankroll(): number {
    return this.bankroll;
  }

  getCurrentBet(): number {
    return this.currentBet;
  }

  getHandTotal(): number {
    return this.hand.reduce((sum, card) => sum + (card > 10 ? 10 : card), 0);
  }

  getRunningCount(): number {
    return this.runningCount;
  }

  getTrueCount(remainingCards: number): number {
    // calculate remaining decks //
    const remainingDecks = remainingCards / 52;

    // avoid dividing by zero //
    if (remainingDecks === 0) {
      return this.runningCount;
    }

    // true count = running count / remaining decks //
    return Math.round(this.runningCount / remainingDecks);
  }

  getStats(): void {
    console.log(`Player: ${this.name}\n`);
    console.log(`Bankroll: ${this.bankroll}\n`);
  }
}

export default Player;
