class Player {
  private fullName: string;
  private bankRoll: number;
  private currentBet: number = 0;
  private hand: number[] = [];
  private cardCount: number = 0;

  constructor(fullName: string, bankRoll: number = 5000) {
    this.fullName = fullName;
    this.bankRoll = bankRoll;
  }

  placeBet(): void {
    // bet placed will vary based on the card count //
    let bet: number;
    // neg inf to 0 //
    if (this.cardCount <= 0) {
      bet = 50;
    }
    // 1 - 5 //
    else if (this.cardCount > 0 && this.cardCount < 6) {
      bet = 100;
    }
    // 6 - 10 //
    else if (this.cardCount > 5 && this.cardCount < 11) {
      bet = 150;
    }
    // 11 or more //
    else {
      bet = 200;
    }

    if (bet > this.bankRoll) {
      throw new Error("Insufficient bankroll!");
    }

    this.currentBet = bet;

    this.bankRoll -= bet;
  }

  receiveCard(card: number): void {
    this.hand.push(card);
    this.updateCardCount(card);
  }

  private updateCardCount(card: number): void {
    // High - Lo //
    if (card >= 2 && card <= 6) this.cardCount++;
    else if (card === 1 || card >= 10) this.cardCount--;
  }

  resetHand(): void {
    this.hand = [];
  }

  getCardCount(): number {
    return this.cardCount;
  }

  adjustBankroll(amount: number): void {
    this.bankRoll += amount;
  }

  getFullName(): string {
    return this.fullName;
  }

  getBankroll(): number {
    return this.bankRoll;
  }

  getCurrentBet(): number {
    return this.currentBet;
  }
}

export default Player;
