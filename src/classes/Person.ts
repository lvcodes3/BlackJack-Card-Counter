import { BlackjackCard } from "../types/Blackjack.js";

class Person {
  protected bankroll: number;
  protected hand: BlackjackCard[] = [];
  protected handTotals: number[] = [];
  protected handTotal: number = 0;
  protected busted: boolean = false;

  constructor(bankroll: number) {
    this.bankroll = bankroll;
  }

  public adjustBankroll(amount: number): void {
    this.bankroll += amount;
  }

  public receiveCard(blackjackCard: BlackjackCard): void {
    this.hand.push(blackjackCard);

    this.setHandTotals(blackjackCard.rank);

    this.handTotalsStatus();
  }

  protected setHandTotals(rank: BlackjackCard["rank"]): void {
    // determine the rank totals //
    let rankTotals: number[];

    if (rank === "A") {
      rankTotals = [1, 11];
    } else if (rank === "J" || rank === "Q" || rank === "K") {
      rankTotals = [10];
    } else {
      rankTotals = [parseInt(rank, 10)];
    }

    // first dealt card //
    if (this.handTotals.length === 0) {
      this.handTotals = rankTotals;
    }
    // 2nd + dealt card //
    else {
      let newHandTotals: number[] = [];

      for (const handTotal of this.handTotals) {
        for (const rankTotal of rankTotals) {
          newHandTotals.push(handTotal + rankTotal);
        }
      }

      // deduplicate and sort in ascending order //
      newHandTotals = [...new Set(newHandTotals)].sort((a, b) => a - b);

      this.handTotals = newHandTotals;
    }
  }

  protected handTotalsStatus(): void {
    // filter hand totals to find numbers less than or equal to 21 //
    const validTotals: number[] = this.handTotals.filter(
      (total) => total <= 21
    );

    // busted //
    if (validTotals.length === 0) {
      this.busted = true;

      // filter hand totals to find busted numbers //
      const invalidTotals: number[] = this.handTotals.filter(
        (total) => total > 21
      );

      this.handTotal = Math.min(...invalidTotals);
    }
    // not-busted //
    else {
      this.handTotal = Math.max(...validTotals);
    }
  }

  public reset(): void {
    this.hand = [];
    this.handTotals = [];
    this.busted = false;
    this.handTotal = 0;
  }

  public getBankroll(): number {
    return this.bankroll;
  }

  public getHand(): BlackjackCard[] {
    return this.hand;
  }

  public getPrettyHand(): string {
    let prettyString: string = "";

    for (let i = 0; i < this.hand.length; i++) {
      if (i !== this.hand.length - 1) {
        prettyString += `
          {
            Rank: ${this.hand[i].rank}
            Suit: ${this.hand[i].suit}
            Color: ${this.hand[i].color}
          }\n
        `;
      } else {
        prettyString += `
          {
            Rank: ${this.hand[i].rank}
            Suit: ${this.hand[i].suit}
            Color: ${this.hand[i].color}
          }
        `;
      }
    }

    return prettyString;
  }

  public getHandTotals(): number[] {
    return this.handTotals;
  }

  public getHandTotal(): number {
    return this.handTotal;
  }

  public getBusted(): boolean {
    return this.busted;
  }
}

export default Person;
