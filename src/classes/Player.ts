import { BlackjackCard } from "../types/Blackjack";

class Player {
  private name: string;
  private bankroll: number;
  private bet: number = 0;
  private hand: BlackjackCard[] = [];

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
    while (bet > this.bankroll) {
      bet -= 50;
      if (bet === 0 || this.bankroll === 0) {
        throw new Error("Insufficient bankroll!");
      }
    }

    // deduct bet from bankroll //
    this.bankroll -= bet;

    // set & return bet //
    this.bet = bet;

    return bet;
  }

  public receiveCard(blackjackCard: BlackjackCard): void {
    this.hand.push(blackjackCard);
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
    console.log(`${this.name}:\nBankroll: ${this.bankroll}\n`);
  }
}

export default Player;
