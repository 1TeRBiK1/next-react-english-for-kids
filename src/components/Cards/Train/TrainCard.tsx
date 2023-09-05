"use client";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from "./index.module.scss";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState, useEffect } from "react";

interface ITrainCardProps {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  isGameMode: boolean;
  isStartGame: boolean;
  handleGameCardClick: (audioSrc: string) => void;
}

const TrainCard: React.FC<ITrainCardProps> = ({
  translation,
  image,
  audioSrc,
  word,
  isGameMode,
  isStartGame,
  handleGameCardClick,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseLeave = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  const handleCardClick = () => {
    if (!isStartGame) {
      const audioElement = new Audio(`/${audioSrc}`);
      audioElement.play();
    } else {
      handleGameCardClick(audioSrc);
    }
  };

  return (
    <Card
      className={styles.cardStyle}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <CardMedia
        className={`${styles.cardImageStyle} ${
          isFlipped ? styles.flipped : ""
        } ${isGameMode ? styles.game : ""}`}
        image={`/${image}`}
      />
      {isGameMode ? null : (
        <CardContent className={styles.cardTextStyle}>
          <Typography
            variant="h6"
            component="div"
            className={styles.cardNameStyle}
          >
            {isFlipped ? translation : word}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className={styles.reverse}
            onClick={() => {
              handleFlip();
            }}
          />
        </CardContent>
      )}
      <audio src={audioSrc} />
    </Card>
  );
};

export default TrainCard;
