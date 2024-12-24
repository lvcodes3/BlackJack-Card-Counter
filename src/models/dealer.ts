import BlackjackShoe from "./blackjackShoe";

class Dealer {
  private bankRoll: number;
  private hand: number[] = [];

  constructor(bankRoll: number = 50000) {
    this.bankRoll = bankRoll;
  }

  dealCard(shoe: BlackjackShoe): number {
    const card = shoe.dealCard();
    this.hand.push(card);
    return card;
  }

  resetHand(): void {
    this.hand = [];
  }

  getBankRoll(): number {
    return this.bankRoll;
  }
}

export default Dealer;
