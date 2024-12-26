import { BlackjackCard } from "../types/Blackjack.js";

class Person {
  protected bankroll: number;
  protected hand: BlackjackCard[] = [];

  constructor(bankroll: number = 0) {
    this.bankroll = bankroll;
  }

  public adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  public receiveCard(blackjackCard: BlackjackCard): void {
    this.hand.push(blackjackCard);
  }

  public resetHand(): void {
    this.hand = [];
  }

  // getters //

  public getBankroll(): number {
    return this.bankroll;
  }

  public getHand(): BlackjackCard[] {
    return this.hand;
  }

  public getPrettyHand(): string {
    let prettyString: string = "";

    for (const card of this.hand) {
      prettyString += `
        {
          Rank: ${card.rank},
          Suit: ${card.suit},
          Color: ${card.color}
        }\n
      `;
    }

    return prettyString;
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

  protected getCardValues(rank: BlackjackCard["rank"]): number[] {
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
}

export default Person;
