import BlackjackShoe from "./BlackjackShoe.js";
import Dealer from "./Dealer.js";
import Player from "./Player.js";

class BlackjackGame {
  private shoe: BlackjackShoe;
  private dealer: Dealer;
  private player: Player;

  constructor(decks: number = 6) {
    this.shoe = new BlackjackShoe(decks);
    this.dealer = new Dealer(50000);
    this.player = new Player("Luis", 2000);
  }

  private playRound(roundNumber: number): void {
    console.log(`\nRound ${roundNumber}!\n`);

    // display both counts at start of round //
    console.log(`Running Count: ${this.shoe.getRunningCount()}`);
    console.log(`True Count: ${this.shoe.getTrueCount()}\n`);

    // display player bet (based on true count) //
    console.log(
      `${this.player.getName()} places a bet of $${this.player.placeBet(
        this.shoe.getTrueCount()
      )}\n`
    );

    // deal initial cards //
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.receiveCard(this.shoe.dealCard());
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.receiveCard(this.shoe.dealCard());

    // display initial hands //
    console.log(`${this.player.getName()}'s hand:`);
    console.log(this.player.getPrettyHand());

    console.log("Dealer shows:");
    console.log(this.dealer.getPrettyFaceCard());

    // player's turn //
    this.playerTurn();

    // dealer's turn (only if player did not bust) //
    if (!this.player.getBusted()) {
      this.dealerTurn();
    }

    // reveal dealer hand if dealer did not hit //
    if (this.dealer.getHand().length <= 2) {
      console.log(`Dealer's hand:`);
      console.log(this.dealer.getPrettyHand());
    }

    // determine winner //
    this.determineWinner();

    // display updated bankroll //
    console.log("Updated Bankrolls:");
    console.log(
      `${this.player.getName()} Bankroll: ${this.player.getBankroll()}`
    );
    console.log(`Dealer Bankroll: ${this.dealer.getBankroll()}\n`);

    // reset hands //
    this.dealer.reset();
    this.player.reset();
  }

  private playerTurn(): void {
    console.log(`${this.player.getName()}'s Turn:`);

    let highestTotal: number = this.player.getHandTotal();

    while (!this.player.getBusted()) {
      // stand if hand total is 17 or more //
      if (highestTotal >= 17) {
        console.log(
          `${this.player.getName()} stands with hand total: ${highestTotal}\n`
        );
        return;
      }

      // otherwise player must hit //
      console.log(
        `${this.player.getName()} hits with hand total: ${highestTotal}`
      );

      this.player.receiveCard(this.shoe.dealCard());

      // display updated hand //
      console.log(`${this.player.getName()}'s updated hand:`);
      console.log(this.player.getPrettyHand());

      // update highest total //
      highestTotal = this.player.getHandTotal();
    }

    console.log(
      `${this.player.getName()} has busted with hand total: ${highestTotal}\n`
    );
  }

  private dealerTurn(): void {
    console.log("Dealer's Turn:");

    let highestTotal: number = this.dealer.getHandTotal();

    while (!this.dealer.getBusted()) {
      // stand if hand total is 17 or more //
      if (highestTotal >= 17) {
        console.log(`Dealer stands with hand total: ${highestTotal}\n`);
        return;
      }

      // otherwise dealer must hit //
      console.log(`Dealer hits with hand total: ${highestTotal}`);

      this.dealer.receiveCard(this.shoe.dealCard());

      // display updated hand //
      console.log(`Dealer's updated hand:`);
      console.log(this.dealer.getPrettyHand());

      // update highest total //
      highestTotal = this.dealer.getHandTotal();
    }

    console.log(`Dealer has busted with hand total: ${highestTotal}\n`);
  }

  private determineWinner(): void {
    console.log("Determining Winner:\n");

    const playerBusted = this.player.getBusted();
    const dealerBusted = this.dealer.getBusted();

    const playerTotal = this.player.getHandTotal();
    const dealerTotal = this.dealer.getHandTotal();

    console.log(
      `${this.player.getName()}'s possible hand totals: ${JSON.stringify(
        this.player.getHandTotals()
      )}`
    );
    console.log(`${this.player.getName()} total: ${playerTotal}\n`);

    console.log(
      `Dealer's possible hand totals: ${JSON.stringify(
        this.dealer.getHandTotals()
      )}`
    );
    console.log(`Dealer total: ${dealerTotal}\n`);

    // dealer win //
    if (playerBusted || (dealerTotal > playerTotal && !dealerBusted)) {
      console.log(
        playerBusted
          ? `Dealer wins this round - ${this.player.getName()} busted!\n`
          : "Dealer wins this round!\n"
      );
      this.dealer.adjustBankroll(this.player.getBet());
    }
    // player win //
    else if (dealerBusted || playerTotal > dealerTotal) {
      console.log(
        dealerBusted
          ? `${this.player.getName()} wins this round - Dealer busted!\n`
          : `${this.player.getName()} wins this round!\n`
      );
      this.player.adjustBankroll(this.player.getBet() * 2);
      this.dealer.adjustBankroll(-this.player.getBet());
    }
    // draw //
    else {
      console.log("No one wins this round - It is a tie - Bet is returned!\n");
      this.player.adjustBankroll(this.player.getBet());
    }
  }

  public startGame(rounds: number): void {
    console.log("\nStarting Blackjack Simulation!\n");

    for (let i = 1; i <= rounds; i++) {
      // play the round //
      this.playRound(i);

      // shuffle shoe if necessary //
      if (this.shoe.getRemainingCardsInShoe() < 52) {
        console.log("\nReshuffling the shoe...\n");
        this.shoe.shuffle();
      }
    }

    console.log("\nGame Over!\n");
  }
}

export default BlackjackGame;
