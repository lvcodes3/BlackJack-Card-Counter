export type BlackjackCard = {
  rank:
    | "A"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";
  suit: "Spades" | "Hearts" | "Diamonds" | "Clubs";
  color: "Red" | "Black";
};
