import BlackjackShoe from "./BlackjackShoe";
import Dealer from "./Dealer";
import Player from "./Player";

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
    console.log(`${this.player.getName()}'s hand: ${this.player.getHand()}`);
    console.log(`Dealer shows: ${this.dealer.getFaceCard()}`);

    // player's turn //
    const playerBusted = this.playerTurn(
      this.player.getHandTotal(),
      this.dealer.getHandTotal()
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
    console.log(`Updated Player bankroll: ${this.player.getBankroll()}`);
    console.log(`Updated Dealer bankroll: ${this.dealer.getBankroll()}`);
  }

  private playerTurn(
    playerHandTotal: number[],
    dealerHandTotal: number[]
  ): boolean {
    // while (this.player.getHandTotal() < 17) {
    //   console.log(
    //     `${this.player.getName()} hits with hand total: ${this.player.getHandTotal()}`
    //   );
    //   this.player.receiveCard(this.shoe.dealCard());
    // }
    // console.log(
    //   `${this.player.getName()} stands with hand total: ${this.player.getHandTotal()}`
    // );
    return false;
  }

  private dealerTurn(dealerHandTotal: number[]): boolean {
    // while (this.dealer.getHandTotal() < 17) {
    //   console.log(`Dealer hits with hand total: ${this.dealer.getHandTotal()}`);
    //   this.dealer.receiveCard(this.shoe.dealCard());
    // }
    // console.log(`Dealer stands with hand total: ${this.dealer.getHandTotal()}`);
    return false;
  }

  private determineWinner(
    playerBusted: boolean,
    dealerBusted: boolean,
    playerHandTotal: number[],
    dealerHandTotal: number[]
  ): void {
    const playerTotal: number = this.getHandTotal(
      playerHandTotal,
      playerBusted
    );
    const dealerTotal: number = this.getHandTotal(
      dealerHandTotal,
      dealerBusted
    );

    console.log(`${this.player.getName()} total: ${playerTotal}`);
    console.log(`Dealer total: ${dealerTotal}`);

    if (playerBusted) {
      console.log(`Dealer wins this round - ${this.player.getName()} busted!`);
      this.dealer.adjustBankroll(this.player.getBet());
      return;
    }

    if (dealerBusted) {
      console.log(`${this.player.getName()} wins this round - Dealer busted!`);
      console.log(
        `${this.player.getBet() * 2} is given to ${this.player.getName()}.`
      );
      this.player.adjustBankroll(this.player.getBet() * 2);
      this.dealer.adjustBankroll(-this.player.getBet());
      return;
    }

    if (playerTotal === dealerTotal) {
      console.log("No one wins this round - It is a tie.");
      console.log(
        `${this.player.getBet()} is returned to ${this.player.getName()}.`
      );
      this.player.adjustBankroll(this.player.getBet());
    } else if (playerTotal > dealerTotal) {
      console.log(`${this.player.getName()} wins this round!`);
      this.player.adjustBankroll(this.player.getBet() * 2);
      this.dealer.adjustBankroll(-this.player.getBet());
      return;
    } else {
      console.log("Dealer wins this round!");
      this.dealer.adjustBankroll(this.player.getBet());
    }
  }

  private getHandTotal(hand: number[], busted: boolean): number {
    let greatest: number = -Infinity;

    for (const num of hand) {
      if (busted) {
        if (num > greatest) {
          greatest = num;
        }
      } else {
        if (num > greatest && num <= 21) {
          greatest = num;
        }
      }
    }

    return greatest;
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
