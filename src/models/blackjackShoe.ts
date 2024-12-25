class BlackjackShoe {
  private size: number; // total number of cards in the shoe
  private decks: number; // total number of decks in the shoe
  private runningCount: number; // High - Low
  private trueCount: number; // running count / remaining decks
  private shoe: number[] = []; // the cards in the shoe

  constructor(decks: number = 6) {
    this.size = 52 * decks;
    this.decks = decks;
    this.runningCount = 0;
    this.trueCount = 0;
    this.shuffle();
  }

  /**
   * MAIN FUNCTIONALITIES
   */

  public shuffle(): void {
    // reset //
    this.size = 52 * this.decks;
    this.runningCount = 0;
    this.trueCount = 0;
    this.shoe = [];

    // initialize //
    for (let i = 0; i < this.decks; i++) {
      this.shoe.push(
        ...Array.from({ length: this.size }, (_, idx) => (idx % 13) + 1)
      );
    }

    // shuffle //
    this.shoe = this.shoe.sort(() => Math.random() - 0.5);
  }

  public dealCard(): number {
    this.size--;

    const dealtCard = this.shoe.pop()!;

    this.updateRunningCount(dealtCard);

    return dealtCard;
  }

  private updateRunningCount(card: number): void {
    if (card >= 2 && card <= 6) {
      this.runningCount++;
    } else if (card === 1 || card >= 10) {
      this.runningCount--;
    }

    this.updateTrueCount(this.size);
  }

  private updateTrueCount(remainingCards: number): void {
    // calculate remaining decks //
    const remainingDecks = remainingCards / 52;

    // avoid dividing by zero //
    if (remainingDecks === 0) {
      this.trueCount = this.runningCount;
    } else {
      this.trueCount = Math.round(this.runningCount / remainingDecks);
    }
  }

  /**
   * GETTERS
   */

  getRemainingCardsInShoe(): number {
    return this.size;
  }

  getRunningCount(): number {
    return this.runningCount;
  }

  getTrueCount(): number {
    return this.trueCount;
  }
}

export default BlackjackShoe;
