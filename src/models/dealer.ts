class Dealer {
  private bankroll: number;
  private hand: number[] = [];

  constructor(bankroll: number = 50000) {
    this.bankroll = bankroll;
  }

  /**
   * MAIN FUNCTIONALITIES
   */

  public adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  public resetHand(): void {
    this.hand = [];
  }

  public receiveCard(card: number): void {
    this.hand.push(card);
  }

  /**
   * GETTERS
   */

  public getBankroll(): number {
    return this.bankroll;
  }

  public getFaceCard(): string {
    return JSON.stringify(this.hand[0]);
  }

  public getHand(): string {
    return JSON.stringify(this.hand);
  }

  public getHandTotal(): number {
    return this.hand.reduce((sum, card) => sum + (card > 10 ? 10 : card), 0);
  }

  public getStats(): void {
    console.log(`Dealer Bankroll: ${this.bankroll}\n`);
  }
}

export default Dealer;
