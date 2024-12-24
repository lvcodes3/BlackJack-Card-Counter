import BlackjackShoe from "./models/blackjackShoe";
import Dealer from "./models/dealer";
import Player from "./models/player";

const deck = new BlackjackShoe(6);
const player = new Player("Player 1", 5000);
const dealer = new Dealer(50000);

function playRound(): void {
  player.resetHand();
  dealer.resetHand();

  // Example round logic:
  player.placeBet();
  const playerBet = player.getCurrentBet();
  const playerCard1 = deck.dealCard();
  const playerCard2 = deck.dealCard();
  player.receiveCard(playerCard1);
  player.receiveCard(playerCard2);

  const dealerCard = dealer.dealCard(deck);

  console.log(`Player bets: ${playerBet}`);
  console.log(`Player received: ${playerCard1}, ${playerCard2}`);
  console.log(`Dealer shows: ${dealerCard}`);
  console.log(`Player card count: ${player.getCardCount()}`);
}

playRound();
