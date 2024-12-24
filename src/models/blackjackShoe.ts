class BlackjackShoe {
  private size: number = 52; // total number of cards in a Blackjack Deck
  private decks: number; // total number of decks in the shoe
  private shoe: number[] = []; // the cards in the shoe

  constructor(decks: number = 6) {
    this.decks = decks;
    this.shuffle();
  }

  // initialize & shuffle the shoe //
  private shuffle(): void {
    this.shoe = [];

    for (let i = 0; i < this.decks; i++) {
      this.shoe.push(
        ...Array.from({ length: this.size }, (_, idx) => (idx % 13) + 1)
      );
    }

    this.shoe = this.shoe.sort(() => Math.random() - 0.5); // simple shuffle
  }

  // deal a card //
  dealCard(): number {
    if (this.shoe.length === 0) {
      this.shuffle();
    }

    return this.shoe.pop()!;
  }

  // check remaining cards //
  remainingCards(): number {
    return this.shoe.length;
  }
}

export default BlackjackShoe;
