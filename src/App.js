import { useEffect, useState } from "react";
import "./styles.css";
import colorData from "../src/color.json";
import Grid from "./componets/Grid";

export default function App() {
  const [data, setData] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);
  const [scores, setScores] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    };
  }, []);

  const keyPressed = (event) => {
    if (event.key.includes("Arrow")) {
      switch (event.key.toLowerCase()) {
        case "arrowup":
          moveTiles("up");
          break;
        case "arrowdown":
          moveTiles("down");
          break;
        case "arrowleft":
          moveTiles("left");
          break;
        case "arrowright":
          moveTiles("right");
          break;
        default:
          break;
      }
    }
  };

  const applyColor = (number) => {
    return number !== "" ? { backgroundColor: colorData[number] } : {};
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  const moveTiles = (direction) => {
    if (direction === "down") {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data[i].length; j++) {
          // checks if the value is not empty
          if (data[i + 1][j] === "") {
            data[i + 1][j] = data[i][j];
            data[i][j] = "";
          }
          // checks if the down position is empty then swap the values
          else if (data[i + 1][j] === data[i][j]) {
            // checks if down position value is same as current then assign multiple of current value to the down position
            data[i + 1][j] = data[i][j] * 2;
            data[i][j] = "";
            setScores((_) => _ + Number(data[i + 1][j]));
          }
        }
      }
    } else if (direction === "up") {
      for (let i = data.length - 1; i > 0; i--) {
        for (let j = 0; j < data[i].length; j++) {
          if (data[i - 1][j] === "") {
            data[i - 1][j] = data[i][j];
            data[i][j] = "";
          } else if (data[i - 1][j] === data[i][j]) {
            data[i - 1][j] = data[i][j] * 2;
            data[i][j] = "";
            setScores((_) => _ + Number(data[i - 1][j]));
          }
        }
      }
    } else if (direction === "right") {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length - 1; j++) {
          if (data[i][j + 1] === "") {
            data[i][j + 1] = data[i][j];
            data[i][j] = "";
          } else if (data[i][j + 1] === data[i][j]) {
            data[i][j + 1] = data[i][j] * 2;
            data[i][j] = "";
            setScores((_) => _ + Number(data[i][j + 1]));
          }
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        for (let j = data[i].length - 1; j > 0; j--) {
          if (data[i][j - 1] === "") {
            data[i][j - 1] = data[i][j];
            data[i][j] = "";
          } else if (data[i][j - 1] === data[i][j]) {
            data[i][j - 1] = data[i][j] * 2;
            data[i][j] = "";
            setScores((_) => _ + Number(data[i][j - 1]));
          }
        }
      }
    }
    setData([...data]);
    addNewTile();
  };

  const addNewTile = () => {
    let row;
    let col;
    let temp = 0;

    try {
      do {
        temp++;
        row = getRandomNumber();
        col = getRandomNumber();
        if (data[row][col] === "") {
          data[row][col] = 2;
          break;
        }
        if (temp === 1000) {
          setGameOver(true);
          break;
        }
      } while (true);
    } catch (Exc) {
      setGameOver(true);
    }

    setData([...data]);
    document.getElementsByName(row)[col].className = "titleNew";
  };

  return (
    <div className="App">
      <div className="header">
        <h1>2048</h1>
        <div className="scores">
          <h2>SCORE</h2>
          <h3>{scores}</h3>
        </div>
      </div>
      <Grid
        data={data}
        setData={setData}
        applyColor={applyColor}
        getRandomNumber={getRandomNumber}
        gameOver={gameOver}
        moveTiles={moveTiles}
        setScores={setScores}
        setGameOver={setGameOver}
      />
      <div className="mobile">
        <p>Use your fingers to swipe</p>
      </div>
    </div>
  );
}
