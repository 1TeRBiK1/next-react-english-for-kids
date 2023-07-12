import TrainCard from "@/components/TrainCard/TrainCard";
import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { ICard } from "@/types/cards";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface IGameContainerProps {
  cards: ICard[];
  isGameMode: boolean;
}

interface IGameState {
  isStartGame: boolean;
  isEndGame: boolean;
  isWin: boolean | null;
  answers: boolean[];
  gameQueue: ICard[];
}

const GameContainer: React.FC<IGameContainerProps> = ({
  cards,
  isGameMode,
}) => {
  const router = useRouter();

  const [gameState, setGameState] = useState<IGameState>({
    isStartGame: false,
    isEndGame: false,
    isWin: null,
    answers: [],
    gameQueue: [...cards].sort(() => 0.5 - Math.random()),
  });

  const { isStartGame, isEndGame, isWin, answers, gameQueue } = gameState;

  const handleStartGameButtonClick = () => {
    setGameState((prevState) => ({ ...prevState, isStartGame: true }));
  };

  const playAudio = (audioSrc: string) => {
    const audioElement = new Audio(audioSrc);
    audioElement.play();
  };

  const playAudioAsync = (audioSrc: string) => {
    setTimeout(() => playAudio(audioSrc), 500);
  }

  const handleGameCardClick = (audioSrc: string) => {
    if (isStartGame) {
      if (audioSrc === gameQueue[0].audioSrc) {
        playAudio(`/assets/audio/correct.mp3`);
        setGameState((prevState) => ({
          ...prevState,
          answers: [...prevState.answers, true],
          gameQueue: prevState.gameQueue.slice(1),
        }));
      } else {
        playAudio(`/assets/audio/error.mp3`);
        setGameState((prevState) => ({
          ...prevState,
          answers: [...prevState.answers, false],
        }));
      }
    }
  };

  useEffect(() => {
    if (isWin !== null) {
      playAudioAsync(
        isWin ? `/assets/audio/success.mp3` : `/assets/audio/failure.mp3`
      );
      if (isEndGame && isStartGame) {
        setTimeout(() => router.replace("/"), 2000);
      }
    }
  }, [isWin]);

  useEffect(() => {
    if (isStartGame && gameQueue.length) {
      playAudioAsync(`/${gameQueue[0].audioSrc}`);
    } else if (isStartGame && !gameQueue.length) {
      setGameState((prevState) => ({
        ...prevState,
        isEndGame: true,
        isWin: prevState.answers.filter((el) => el === false).length <= 5,
      }));
    }
  }, [gameQueue, isStartGame]);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {answers.map((answer, index) => (
          <Image
            key={index}
            alt="star"
            width={50}
            height={50}
            src={answer ? "/assets/img/star-win.svg" : "/assets/img/star.svg"}
          />
        ))}
      </Container>
      <Container
        maxWidth={false}
        sx={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {isEndGame ? (
          <Image
            width={300}
            height={300}
            alt="End Game"
            src={isWin ? "/assets/img/success.jpg" : "/assets/img/failure.jpg"}
          />
        ) : (
          cards.map((card) => (
            <TrainCard
              {...card}
              key={card.word}
              isGameMode={isGameMode}
              isStartGame={isStartGame}
              handleGameCardClick={handleGameCardClick}
            />
          ))
        )}
      </Container>
      {isGameMode && (
        <Container
          maxWidth={false}
          sx={{
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {!isStartGame ? (
            <Button
              onClick={handleStartGameButtonClick}
              variant="contained"
              sx={{
                background: "linear-gradient(40deg,#ffd86f,#fc6262)",
                width: "60vw",
                mt: 2,
                height: 50,
                borderRadius: "30px",
              }}
            >
              Start Game
            </Button>
          ) : (
            <Button
              onClick={() => playAudio(`/${gameQueue[0]?.audioSrc}`)}
              variant="contained"
              sx={{
                background: "linear-gradient(40deg,#ffd86f,#fc6262)",
                width: "60vw",
                maxWidth: "60px",
                mt: 2,
                height: 50,
                borderRadius: "30px",
              }}
            >
              <Image
                src={"/assets/img/repeat.png"}
                alt="repeat"
                width={40}
                height={40}
              />
            </Button>
          )}
        </Container>
      )}
    </>
  );
};

export default GameContainer;
