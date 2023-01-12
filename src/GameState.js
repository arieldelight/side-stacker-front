import { createContext } from "react";
import _ from "lodash";

export function createGameState() {
  return {
    gameId: null,
    playerId: null,
    playerColor: null,
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    status: "dummy-status",
    winner: null,
  };
}

export function createContextValue(
  setNetworkState,
  setErrorMessage,
  [originalGameState, setGameState]
) {
  return {
    network: "connecting",
    gameState: originalGameState,
    setBoard: (board) => {
      setGameState((currentState) => {
        const newGameState = _.cloneDeep(currentState);
        newGameState.board = board;
        return newGameState;
      });
    },
    setErrorMessage: (message) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 4000);
    },
  };
}

export const Context = createContext({
  network: "dummy-connection-status",
  gameState: {
    gameId: "dummy-game-id",
    playerId: "dummy-player-id",
    playerColor: "dummy-player-color",
    board: [[null]],
    status: "dummy-status",
    winner: null,
  },
  setBoard: (board) => console.log(`Setting board ${board}`),
});
