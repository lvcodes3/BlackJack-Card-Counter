class BlackjackShoe {
  private size: number; // total number of cards in the shoe
  private decks: number; // total number of decks in the shoe
  private shoe: number[] = []; // the cards in the shoe

  constructor(decks: number = 6) {
    this.size = 52 * decks;
    this.decks = decks;
    this.shuffle();
  }

  // initialize & shuffle the shoe //
  shuffle(): void {
    // reset count //
    this.size = 52 * this.decks;

    // reset shoe //
    this.shoe = [];

    for (let i = 0; i < this.decks; i++) {
      this.shoe.push(
        ...Array.from({ length: this.size }, (_, idx) => (idx % 13) + 1)
      );
    }

    this.shoe = this.shoe.sort(() => Math.random() - 0.5); // simple shuffle
  }

  dealCard(): number {
    // empty shoe //
    if (this.size === 0) {
      this.shuffle();
    }

    this.size--;
    return this.shoe.pop()!;
  }

  remainingCards(): number {
    return this.size;
  }
}

export default BlackjackShoe;
