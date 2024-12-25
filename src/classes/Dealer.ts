import { BlackjackCard } from "../types/Blackjack";

class Dealer {
  private bankroll: number;
  private hand: BlackjackCard[] = [];

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

  public receiveCard(blackjackCard: BlackjackCard): void {
    this.hand.push(blackjackCard);
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

  public getHandTotal(): number[] {
    let totals: number[] = [0]; // start with a single total of 0

    for (const card of this.hand) {
      // get possible values for the card //
      const cardValues = this.getCardValues(card.rank);

      const newTotals: number[] = [];

      for (const total of totals) {
        for (const value of cardValues) {
          newTotals.push(total + value);
        }
      }

      totals = newTotals;
    }

    // deduplicate and return unique totals sorted in ascending order //
    return [...new Set(totals)].sort((a, b) => a - b);
  }

  private getCardValues(rank: BlackjackCard["rank"]): number[] {
    switch (rank) {
      case "A":
        return [1, 11]; // ace can be 1 or 11
      case "J":
      case "Q":
      case "K":
        return [10]; // face cards are 10
      default:
        return [parseInt(rank, 10)]; // numeric cards
    }
  }

  public getStats(): void {
    console.log(`Dealer:\nBankroll: ${this.bankroll}\n`);
  }
}

export default Dealer;
