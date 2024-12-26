import Person from "./Person.js";

import { BlackjackCard } from "../types/Blackjack.js";

class Dealer extends Person {
  constructor(bankroll: number = 50000) {
    super(bankroll);
  }

  public getFaceCard(): BlackjackCard {
    return this.hand[0];
  }

  public getPrettyFaceCard(): string {
    return `
      {
        Rank: ${this.hand[0].rank},
        Suit: ${this.hand[0].suit},
        Color: ${this.hand[0].color}
      }\n
    `;
  }
}

export default Dealer;
