import { useEffect, useState } from "react";

export default function Grid({
  applyColor,
  data,
  getRandomNumber,
  setData,
  gameOver,
  moveTiles,
  setScores,
  setGameOver,
}) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isReset, SetReset] = useState([false]);

  useEffect(() => {
    assignNewValueOnFirst();
    document.addEventListener(
      "touchmove",
      function (event) {
        event.preventDefault();
      },
      { passive: false }
    );
  }, []);

  useEffect(() => {
    isReset[0] ? assignNewValueOnFirst() : "";
  }, [isReset]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e) => {
    const { x: startX, y: startY } = touchStart;
    const { x: endX, y: endY } = touchEnd;

    const dx = endX - startX;
    const dy = endY - startY;

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const swipeDistance = Math.sqrt(dx * dx + dy * dy);

    if (swipeDistance > 50) {
      if (angle >= -45 && angle < 45) {
        // Swipe right
        moveTiles("right");
      } else if (angle >= 45 && angle < 135) {
        // Swipe up

        moveTiles("down");
        e.preventDefault();
      } else if (angle >= -135 && angle < -45) {
        // Swipe down
        moveTiles("up");
      } else {
        // Swipe left
        moveTiles("left");
      }
    }
  };

  function assignNewValueOnFirst() {
    let row1 = getRandomNumber();
    let column1 = getRandomNumber();

    let row2 = getRandomNumber();
    let column2 = getRandomNumber();

    data[row1][column1] = 2;
    data[row2][column2] = 2;

    setData((da) => [...da]);
  }

  function reset() {
    setScores(0);
    setGameOver(false);
    setData((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          data[i][j] = "";
        }
      }
      return data;
    });
    SetReset(...[[true]]);
  }

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="grid"
      >
        {data.map((row, key1) => {
          return row.map((col, key2) => {
            return (
              <button
                name={key1}
                index={String(key1) + key2}
                style={applyColor(col)}
              >
                {col}
              </button>
            );
          });
        })}
        <div onClick={reset} className={gameOver ? "gameover" : "game"}>
          <h1>Game Over</h1>
          <button onClick={reset}>Try Again</button>
        </div>
      </div>
    </>
  );
}
