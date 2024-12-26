import { BlackjackCard } from "../types/Blackjack";

class BlackjackShoe {
  private size: number; // total number of cards in the shoe
  private decks: number; // total number of decks in the shoe
  private runningCount: number; // high-low running count
  private trueCount: number; // running count / remaining decks
  private shoe: BlackjackCard[] = []; // the cards in the shoe
  private static readonly ranks: BlackjackCard["rank"][] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  private static readonly suits: BlackjackCard["suit"][] = [
    "Spades",
    "Hearts",
    "Diamonds",
    "Clubs",
  ];
  private static readonly colors: Record<
    BlackjackCard["suit"],
    BlackjackCard["color"]
  > = {
    Spades: "Black",
    Clubs: "Black",
    Hearts: "Red",
    Diamonds: "Red",
  };

  constructor(decks: number = 6) {
    this.size = 52 * decks;
    this.decks = decks;
    this.runningCount = 0;
    this.trueCount = 0;
    this.shuffle();
  }

  public shuffle(): void {
    // reset //
    this.size = 52 * this.decks;
    this.runningCount = 0;
    this.trueCount = 0;
    this.shoe = [];

    // initialize the shoe with all cards //
    for (let i = 0; i < this.decks; i++) {
      for (const suit of BlackjackShoe.suits) {
        for (const rank of BlackjackShoe.ranks) {
          this.shoe.push({
            rank,
            suit,
            color: BlackjackShoe.colors[suit],
          });
        }
      }
    }

    // shuffle //
    this.shoe = this.shoe.sort(() => Math.random() - 0.5);
  }

  public dealCard(): BlackjackCard {
    this.size--;

    const blackjackCard: BlackjackCard = this.shoe.pop()!;

    this.updateRunningCount(blackjackCard);

    return blackjackCard;
  }

  private updateRunningCount(blackjackCard: BlackjackCard): void {
    switch (blackjackCard.rank) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
        this.runningCount++;
        break;
      case "10":
      case "J":
      case "Q":
      case "K":
      case "A":
        this.runningCount--;
        break;
      default:
        break;
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

  public getRemainingCardsInShoe(): number {
    return this.size;
  }

  public getRunningCount(): number {
    return this.runningCount;
  }

  public getTrueCount(): number {
    return this.trueCount;
  }
}

export default BlackjackShoe;
