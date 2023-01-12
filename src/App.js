import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Context, createContextValue, createGameState } from "./GameState";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [networkState, setNetworkState] = useState("disconnected");
  const [errorMessage, setErrorMessage] = useState("");
  const [gameState, setGameState] = useState(createGameState());
  const gameStateRef = useRef(gameState);
  const serverContactedRef = useRef(false);

  async function contactServer() {
    setNetworkState("connecting...");
    try {
      const { data } = await axios.post("http://localhost:3000/games");
      setGameState((originalGameState) =>
        updateGameState(originalGameState, data)
      );
      setNetworkState("connected!");
    } catch (error) {
      setNetworkState(`Error connecting: ${error.message}`);
      throw error;
    }
  }

  async function refreshFromServer() {
    const url = `http://localhost:3000/games/${gameStateRef.current.gameId}?playerId=${gameStateRef.current.playerId}`;
    const { data } = await axios.get(url);
    setGameState((originalGameState) =>
      updateGameState(originalGameState, data)
    );
  }

  function updateGameState(originalGameState, newGameState) {
    gameStateRef.current = {
      ...originalGameState,
      ...filterExpectedValuesFromGameState(newGameState),
    };
    return gameStateRef.current;
  }

  function filterExpectedValuesFromGameState(gameState) {
    const { gameId, playerId, playerColor, board, status } = gameState;
    return { gameId, playerId, playerColor, board, status };
  }

  useEffect(() => {
    if (serverContactedRef.current) {
      return;
    }
    serverContactedRef.current = true;
    contactServer().then((response) => {
      setInterval(() => refreshFromServer(response), 2000);
    });
  }, []);

  return (
    <Context.Provider
      value={createContextValue(setNetworkState, setErrorMessage, [
        gameState,
        setGameState,
      ])}
    >
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <p>
            Network: {networkState}{" "}
            {gameState.gameId ? `(game #${gameState.gameId})` : ""}
          </p>
        </div>
        <div>
          <p>{gameState.status.replaceAll("_", " ")}</p>
        </div>
        <PlayerColor color={gameState.playerColor} />
        <ErrorMessage message={errorMessage} />
        <Board />
      </div>
    </Context.Provider>
  );
}

function PlayerColor({ color }) {
  const className = color ? "" : "Invisible";
  return (
    <div className={className}>
      <span>Your color: </span>
      <span style={{ color }}>{color}</span>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className={"ErrorMessage" + (message ? "" : " Invisible")}>
      <p>{message || "-"}</p>
    </div>
  );
}

export default App;
