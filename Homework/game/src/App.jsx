/** @jsxImportSource @emotion/react */

import "./App.css";
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { createPortal } from "react-dom"; //모달 창(게임완료)

//숫자 배열 생성
function createNumbers(start, end) {
  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
}

//생성된 숫자 배열 섞기
function shuffle(numbers) {
  const copy = [...numbers];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[randomIndex];
    copy[randomIndex] = temp;
  }
  return copy;
}

function App() {
  const [menu, setMenu] = useState("game"); //menu=현재메뉴 setMenu=메뉴바꾸는함수
  //레벨별 변경
  const [level, setLevel] = useState(1);
  const gridSize = level + 2;
  const totalNumbers = gridSize * gridSize * 2;

  const [numbers, setNumbers] = useState(shuffle(createNumbers(1, 9)));
  const [bigNumbers, setbigNumbers] = useState(() =>
    shuffle(createNumbers(10, 18)),
  );

  const [nextNumber, setNextNumber] = useState(1); //다음에 클릭해야하는 숫자
  const [time, setTime] = useState(0); //플레이 시간
  const [isPlaying, setIsPlaying] = useState(false); //타이머 실행 여부 (정지/실행)
  const [showModal, setShowModal] = useState(false); //게임 완료 모달
  const [finalTime, setFinalTime] = useState(0); //게임 실행 시간 (끝난 시간)
  //게임 기록 불러오기
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("number-game-records");
    return saved ? JSON.parse(saved) : [];
  });
  const startTime = useRef(null);
  //타이머
  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = setInterval(() => {
      setTime((performance.now() - startTime.current) / 1000);
    }, 10);

    return () => clearInterval(timer);
  }, [isPlaying]);

  //게임을 다시 시작할 수 있도록
  function resetGame(selectedLevel = level) {
    const size = selectedLevel + 2;
    const count = size * size;
    setNumbers(shuffle(createNumbers(1, count))); //숫자 다시 섞기
    setbigNumbers(shuffle(createNumbers(count + 1, count * 2))); //숫자 다시 섞기
    setNextNumber(1); //다음 클릭할 숫자를 1로 초기화
    setTime(0); //타이머 0초로 초기화
    setIsPlaying(false); //타이머 중지
  }

  //클릭했을때 큰 숫자들로 바꾸는 함수
  function handleClick(index) {
    //잘못된거 눌렀을때
    if (numbers[index] !== nextNumber) {
      return;
    }
    //타이머 시작
    if (nextNumber === 1) {
      startTime.current = performance.now();
      setIsPlaying(true);
    }
    //클릭 후 숫자 교체하기
    const updated = [...numbers];
    if (bigNumbers.length > 0) {
      updated[index] = bigNumbers[0];
    } else {
      updated[index] = null;
    }
    setNumbers(updated);
    setbigNumbers(bigNumbers.slice(1)); //큰숫자들 중 사용한 숫자 제거
    setNextNumber(nextNumber + 1); //다음에 눌러야 할 숫자

    //타이머 종료
    if (nextNumber === totalNumbers) {
      const totalTime = (performance.now() - startTime.current) / 1000; //총 게임 시간

      setIsPlaying(false);
      setTime(totalTime);
      //랭킹판에 기록
      const newRecord = {
        date: new Date().toLocaleString(),
        level: level,
        time: totalTime,
      };

      const updatedRecords = [...records, newRecord];

      localStorage.setItem(
        "number-game-records",
        JSON.stringify(updatedRecords),
      );
      setRecords(updatedRecords);
      setFinalTime(totalTime);
      setShowModal(true);
      resetGame();
    }
  }
  //랭킹 정렬
  const sortedRecords = [...records];

  sortedRecords.sort((a, b) => {
    // 레벨이 높은 사람이 먼저
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    // 레벨이 같으면 시간이 짧은 사람이 먼저
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }

    return 0;
  });

  //게임판 화면
  return (
    <>
      <header css={headerStyle}>
        <h1 css={h1Style}>🔢숫자 클릭 게임</h1>
        <div>
          <button type="button" onClick={() => setMenu("game")}>
            게임
          </button>
          <button type="button" onClick={() => setMenu("ranking")}>
            랭킹
          </button>
        </div>

        <div>
          {menu === "game" && (
            <div css={levelStyle}>
              {/*레벨선택*/}
              <select
                value={level}
                onChange={(event) => {
                  const selectedLevel = Number(event.target.value);
                  setLevel(selectedLevel);
                  resetGame(selectedLevel);
                }}
              >
                <option value="1">Level 1 (3x3)</option>
                <option value="2">Level 2 (4x4)</option>
                <option value="3">Level 3 (5x5)</option>
              </select>
              <span>{time.toFixed(2)}초</span>
            </div>
          )}
        </div>
      </header>

      <main>
        {menu === "game" && (
          <section>
            <p css={pStyle}>
              {nextNumber > totalNumbers ? (
                "완료!"
              ) : (
                <>
                  다음 숫자: <strong>{nextNumber}</strong> ({nextNumber} /{" "}
                  {totalNumbers})
                </>
              )}
            </p>

            <div css={boardStyle(gridSize)}>
              {numbers.map((number, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleClick(index)}
                  disabled={number === null}
                >
                  {number}
                </button>
              ))}
            </div>
          </section>
        )}
        {/*랭킹판 화면*/}
        {menu === "ranking" && (
          <section css={rankingStyle}>
            <div css={rankingHeaderStyle}>
              <h2>🏆랭킹🏆</h2>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("number-game-records");
                  setRecords([]);
                }}
              >
                초기화
              </button>
            </div>

            {sortedRecords.length === 0 ? (
              <p>아직 기록이 없어요. 게임을 플레이해보세요!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>레벨</th>
                    <th>플레이 시간</th>
                    <th>기록 시각</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>Level {record.level}</td>
                      <td>{record.time.toFixed(2)}초</td>
                      <td>{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
      {/* 게임 완료 모달 */}
      {showModal &&
        createPortal(
          <div css={modalStyle}>
            <h2>🎉 게임 완료!</h2>
            <p>걸린 시간: {finalTime.toFixed(2)}초</p>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetGame();
              }}
            >
              확인
            </button>
          </div>,

          document.body,
        )}
    </>
  );
}

export default App;

//============================================================================

//헤더
const headerStyle = css`
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  h1 {
    font-size: 15px;
  }
`;

//숫자 버튼
const boardStyle = (gridSize) => css`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(${gridSize}, minmax(0, 1fr));
  width: min(90vw, 450px);
  margin-left: auto;
  margin-right: auto;
  gap: 10px;

  button {
    aspect-ratio: 1 / 1;
    min-width: 0;
    font-size: 30px;
    border-radius: 8px;
    cursor: pointer;

    /*클릭되는것같은효과*/
    &:active {
      background-color: #b6dfce;
      transform: scale(0.9);
    }
  }
`;

//다음 숫자
const pStyle = css`
  margin-top: 40px;
  text-align: center;
  strong {
    font-size: 28px;
  }
`;

const h1Style = css`
  text-align: left;
`;
//랭킹판
const rankingStyle = css`
  width: min(90%, 550px);
  margin: 32px auto;
  box-sizing: border-box;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
  }

  th,
  td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
  }

  th {
    background-color: #b6dfce;
    font-weight: 700;
  }
`;

const rankingHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    margin: 0;
    font-size: 20px;
  }

  button {
    /*초기화버튼*/
    padding: 8px 14px;
    border: 1px solid #e88b8b;
    border-radius: 6px;
    background-color: white;
    color: #d9534f;
  }
`;

//게임 완료 모달
const modalStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*완벽한 중앙 정렬을 위하여 */
  width: min(80%, 350px);
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;

  h2 {
    margin-top: 0;
  }

  p {
    margin: 20px 0;
    font-size: 18px;
  }

  button {
    padding: 10px 24px;
    border: none;
    border-radius: 6px;
    background-color: #b6dfce;
    cursor: pointer;
  }
`;

//레벨 선택과 타이머 간격 만들기
const levelStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;
