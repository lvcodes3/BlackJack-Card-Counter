import BlackjackShoe from "./BlackjackShoe";

class Dealer {
  private bankroll: number;
  private hand: number[] = [];

  constructor(bankroll: number = 50000) {
    this.bankroll = bankroll;
  }

  dealCard(shoe: BlackjackShoe): number {
    const card = shoe.dealCard();
    this.hand.push(card);
    return card;
  }

  playTurn(shoe: BlackjackShoe): void {
    while (this.getHandTotal() < 17) {
      this.dealCard(shoe);
    }
  }

  resetHand(): void {
    this.hand = [];
  }

  adjustBankroll(amount: number) {
    this.bankroll += amount;
  }

  getHandTotal(): number {
    return this.hand.reduce((sum, card) => sum + (card > 10 ? 10 : card), 0);
  }

  getStats(): void {
    console.log(`Dealer\n`);
    console.log(`Bankroll: ${this.bankroll}\n`);
  }
}

export default Dealer;
