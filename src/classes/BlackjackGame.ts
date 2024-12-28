import BlackjackShoe from "./BlackjackShoe.js";
import Dealer from "./Dealer.js";
import Player from "./Player.js";

import { BlackjackCard } from "../types/Blackjack.js";

class BlackjackGame {
  private shoe: BlackjackShoe;
  private dealer: Dealer;
  private player: Player;

  constructor(decks: number = 6) {
    this.shoe = new BlackjackShoe(decks);
    this.dealer = new Dealer(50000);
    this.player = new Player("Luis", 5000);
  }

  private playRound(roundNumber: number): void {
    console.log(`\nRound ${roundNumber}!\n`);

    // show both counts //
    console.log(`Running Count: ${this.shoe.getRunningCount()}`);
    console.log(`True Count: ${this.shoe.getTrueCount()}\n`);

    // player places bet //
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

    console.log(`${this.player.getName()}'s hand:`);
    console.log(this.player.getPrettyHand());

    console.log("Dealer shows:");
    console.log(this.dealer.getPrettyFaceCard());

    // player's turn //
    this.playerTurn();

    // dealer only plays if player did not bust //
    if (!this.player.getBusted()) {
      this.dealerTurn();
    }

    // determine winner //
    this.determineWinner();

    // display updated bankroll //
    console.log(
      `Updated ${this.player.getName()} Bankroll: ${this.player.getBankroll()}`
    );
    console.log(`Updated Dealer Bankroll: ${this.dealer.getBankroll()}\n`);

    // reset hands //
    this.dealer.reset();
    this.player.reset();
  }

  // TODO: replace dealer logic with player logic //
  private playerTurn(): void {
    console.log(`${this.player.getName()}'s Turn:`);

    let highestTotal: number = this.player.getHandTotal();

    while (!this.player.getBusted()) {
      // stand if hand total is 17 or more //
      if (highestTotal >= 17) {
        console.log(
          `${this.player.getName()} stands with hand total: ${highestTotal}`
        );
        return;
      }

      // otherwise player must hit //
      `${this.player.getName()} hits with hand total: ${highestTotal}`;

      const cardDealt: BlackjackCard = this.shoe.dealCard();

      this.player.receiveCard(cardDealt);

      console.log(`${this.player.getName()} receives:`);
      this.displayPrettyCard(cardDealt);

      // update highest total //
      highestTotal = this.player.getHandTotal();
    }

    console.log(
      `${this.player.getName()} has busted with hand total: ${highestTotal}`
    );
  }

  private dealerTurn(): void {
    console.log("Dealer's Turn:");

    let highestTotal: number = this.dealer.getHandTotal();

    while (!this.dealer.getBusted()) {
      // stand if hand total is 17 or more //
      if (highestTotal >= 17) {
        console.log(`Dealer stands with hand total: ${highestTotal}`);
        return;
      }

      // otherwise dealer must hit //
      `Dealer hits with hand total: ${highestTotal}`;

      const cardDealt: BlackjackCard = this.shoe.dealCard();

      this.dealer.receiveCard(cardDealt);

      console.log(`Dealer receives:`);
      this.displayPrettyCard(cardDealt);

      // update highest total //
      highestTotal = this.dealer.getHandTotal();
    }

    console.log(`Dealer has busted with hand total: ${highestTotal}`);
  }

  private determineWinner(): void {
    const playerBusted = this.player.getBusted();
    const dealerBusted = this.dealer.getBusted();
    const playerTotal = this.player.getHandTotal();
    const dealerTotal = this.dealer.getHandTotal();

    console.log(`${this.player.getName()} total: ${playerTotal}`);
    console.log(`Dealer total: ${dealerTotal}`);

    if (playerBusted || (dealerTotal > playerTotal && !dealerBusted)) {
      console.log(
        playerBusted
          ? `Dealer wins this round - ${this.player.getName()} busted!`
          : "Dealer wins this round!"
      );
      this.dealer.adjustBankroll(this.player.getBet());
    } else if (dealerBusted || playerTotal > dealerTotal) {
      console.log(
        dealerBusted
          ? `${this.player.getName()} wins this round - Dealer busted!`
          : `${this.player.getName()} wins this round!`
      );
      this.player.adjustBankroll(this.player.getBet() * 2);
      this.dealer.adjustBankroll(-this.player.getBet());
    } else {
      console.log("No one wins this round - It is a tie - Bet is returned!");
      this.player.adjustBankroll(this.player.getBet());
    }
  }

  public displayPrettyCard(blackjackCard: BlackjackCard): void {
    console.log(`
      {
        Rank: ${blackjackCard.rank},
        Suit: ${blackjackCard.suit},
        Color: ${blackjackCard.color}
      }\n
    `);
  }

  public startGame(rounds: number): void {
    console.log("\nStarting Blackjack Simulation!\n");

    for (let i = 1; i <= rounds; i++) {
      // play the round //
      this.playRound(i);

      // shuffle shoe if necessary //
      if (this.shoe.getRemainingCardsInShoe() < 52) {
        console.log("Reshuffling the shoe...\n");
        this.shoe.shuffle();
      }
    }

    console.log("\nGame Over!\n");
  }
}

export default BlackjackGame;
