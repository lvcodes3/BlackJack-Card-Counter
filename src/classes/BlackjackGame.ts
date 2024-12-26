import BlackjackShoe from "./BlackjackShoe";
import Dealer from "./Dealer";
import Player from "./Player";

import { BlackjackCard } from "../types/Blackjack";

class BlackjackGame {
  private shoe: BlackjackShoe;
  private dealer: Dealer;
  private player: Player;

  constructor(decks: number = 6) {
    this.shoe = new BlackjackShoe(decks);
    this.dealer = new Dealer(50000);
    this.player = new Player("Luis", 5000);
  }

  private playRound(): void {
    console.log("\nStarting a new round of Blackjack!\n");

    // reset hands //
    this.dealer.resetHand();
    this.player.resetHand();

    // show both counts //
    console.log(`Running Count: ${this.shoe.getRunningCount()}`);
    console.log(`True Count: ${this.shoe.getTrueCount()}`);

    // player places bet //
    console.log(
      `${this.player.getName()} places a bet of $${this.player.placeBet(
        this.shoe.getTrueCount()
      )}`
    );

    // deal initial cards //
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.receiveCard(this.shoe.dealCard());
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.receiveCard(this.shoe.dealCard());
    console.log(
      `${this.player.getName()}'s hand: ${JSON.stringify(
        this.player.getHand()
      )}`
    );
    console.log(`Dealer shows: ${JSON.stringify(this.dealer.getFaceCard())}`);

    // player's turn //
    const playerBusted = this.playerTurn(
      this.player.getHandTotal(),
      this.dealer.getFaceCard()
    );

    // dealer only plays if player did not bust //
    let dealerBusted = false;
    if (!playerBusted) {
      dealerBusted = this.dealerTurn(this.dealer.getHandTotal());
    }

    // determine winner //
    this.determineWinner(
      playerBusted,
      dealerBusted,
      this.player.getHandTotal(),
      this.dealer.getHandTotal()
    );

    // display updated bankroll //
    console.log(
      `Updated ${this.player.getName()}: ${JSON.stringify(
        this.player.getStats()
      )}`
    );
    console.log(`Updated Dealer: ${JSON.stringify(this.dealer.getStats())}`);
  }

  private playerTurn(
    playerHandTotals: number[],
    dealerFaceCard: BlackjackCard
  ): boolean {
    // TODO: replace dealer logic with player logic //
    console.log(`Dealer Face Card: ${JSON.stringify(dealerFaceCard)}`);

    while (true) {
      // filter out hand totals that are busted //
      const validTotals = playerHandTotals.filter((total) => total <= 21);

      // check if there are no valid totals //
      if (validTotals.length === 0) {
        console.log(
          `${this.player.getName()} busts with hand totals: ${JSON.stringify(
            playerHandTotals
          )}`
        );
        return true;
      }

      // determine if any valid total is 17 or above //
      if (validTotals.some((total) => total >= 17)) {
        console.log(
          `${this.player.getName()} stands with hand total: ${Math.max(
            ...validTotals
          )}`
        );
        return false;
      }

      // if no valid total is 17 or above, player must hit //
      console.log(
        `${this.player.getName()} hits with hand totals: ${JSON.stringify(
          playerHandTotals
        )}`
      );
      this.player.receiveCard(this.shoe.dealCard());

      // update playerHandTotals based on the new card received //
      playerHandTotals = this.player.getHandTotal();
    }
  }

  private dealerTurn(dealerHandTotals: number[]): boolean {
    while (true) {
      // filter out hand totals that are busted //
      const validTotals = dealerHandTotals.filter((total) => total <= 21);

      // check if there are no valid totals //
      if (validTotals.length === 0) {
        console.log(
          `Dealer busts with hand totals: ${JSON.stringify(dealerHandTotals)}`
        );
        return true;
      }

      // determine if any valid total is 17 or above //
      if (validTotals.some((total) => total >= 17)) {
        console.log(
          `Dealer stands with hand total: ${Math.max(...validTotals)}`
        );
        return false;
      }

      // if no valid total is 17 or above, dealer must hit //
      console.log(
        `Dealer hits with hand totals: ${JSON.stringify(dealerHandTotals)}`
      );
      this.dealer.receiveCard(this.shoe.dealCard());

      // update dealerHandTotals based on the new card received //
      dealerHandTotals = this.dealer.getHandTotal();
    }
  }

  private determineWinner(
    playerBusted: boolean,
    dealerBusted: boolean,
    playerHandTotals: number[],
    dealerHandTotals: number[]
  ): void {
    const playerTotal: number = this.getHandTotal(
      playerBusted,
      playerHandTotals
    );
    const dealerTotal: number = this.getHandTotal(
      dealerBusted,
      dealerHandTotals
    );

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

  private getHandTotal(busted: boolean, hand: number[]): number {
    return busted
      ? Math.max(...hand)
      : Math.max(...hand.filter((total) => total <= 21));
  }

  public startGame(rounds: number): void {
    console.log("Starting Blackjack Simulation...\n");

    // display stats //
    this.dealer.getStats();
    this.player.getStats();

    for (let i = 0; i < rounds; i++) {
      // play the round //
      this.playRound();

      // check shoe to shuffle if necessary //
      if (this.shoe.getRemainingCardsInShoe() < 52) {
        console.log("Reshuffling the shoe...");
        this.shoe.shuffle();
      }
    }

    // display stats //
    this.dealer.getStats();
    this.player.getStats();

    console.log("Game Over!");
  }
}

export default BlackjackGame;
