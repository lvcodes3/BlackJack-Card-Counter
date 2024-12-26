import Person from "./Person";

import { BlackjackCard } from "../types/Blackjack";

class Dealer extends Person {
  constructor(bankroll: number = 50000) {
    super(bankroll);
  }

  public getFaceCard(): BlackjackCard {
    return this.hand[0];
  }
}

export default Dealer;
