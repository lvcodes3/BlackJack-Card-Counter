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
    this.player = new Player("Player 1", 5000);
  }

  private playRound(): void {
    console.log("\nStarting a new round of Blackjack!\n");

    // reset hands //
    this.dealer.resetHand();
    this.player.resetHand();

    // place bet //
    this.player.placeBet(this.shoe.remainingCards());

    // deal initial cards //
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.dealCard(this.shoe);
    this.player.receiveCard(this.shoe.dealCard());
    this.dealer.dealCard(this.shoe);
    console.log(`${this.player.getName()}'s hand: ${this.player["hand"]}`);
    console.log(`Dealer shows: ${this.dealer["hand"][0]}`);

    // player's turn //
    this.playerTurn();

    // dealer's turn //
    this.dealerTurn();

    // determine winner //
    this.determineWinner();

    console.log(`Player bankroll: ${this.player.getBankroll()}`);
    console.log(`Dealer bankroll: ${this.dealer["bankroll"]}`);
  }

  private playerTurn(): void {
    while (this.player.getHandTotal() < 17) {
      console.log(
        `${this.player.getName()} hits with hand total: ${this.player.getHandTotal()}`
      );
      this.player.receiveCard(this.shoe.dealCard());
    }
    console.log(
      `${this.player.getName()} stands with hand total: ${this.player.getHandTotal()}`
    );
  }

  private dealerTurn(): void {
    while (this.dealer.getHandTotal() < 17) {
      console.log(`Dealer hits with hand total: ${this.dealer.getHandTotal()}`);
      this.dealer.dealCard(this.shoe);
    }
    console.log(`Dealer stands with hand total: ${this.dealer.getHandTotal()}`);
  }

  private determineWinner(): void {
    const playerTotal = this.player.getHandTotal();
    const dealerTotal = this.dealer.getHandTotal();

    console.log(`Player total: ${playerTotal}`);
    console.log(`Dealer total: ${dealerTotal}`);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      console.log("Player wins this round!");
      this.player.adjustBankroll(this.player.getCurrentBet() * 2);
      this.dealer.adjustBankroll(-this.player.getCurrentBet());
    } else if (dealerTotal === playerTotal) {
      console.log("It's a tie! Bet is returned to the player.");
      this.player.adjustBankroll(this.player.getCurrentBet());
    } else {
      console.log("Dealer wins this round!");
      this.dealer.adjustBankroll(this.player.getCurrentBet());
    }
  }

  public startGame(rounds: number): void {
    console.log("Starting Blackjack Simulation...\n");

    this.dealer.getStats();
    this.player.getStats();

    for (let i = 0; i < rounds; i++) {
      this.playRound();

      if (this.shoe.remainingCards() < 52) {
        console.log("Reshuffling the shoe...");
        this.shoe.shuffle();
      }
    }

    console.log("Game Over!");

    this.dealer.getStats();
    this.player.getStats();
  }
}

export default BlackjackGame;
