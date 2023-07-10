"use client";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from "./index.module.scss";

interface IMainCardProps {
  text: string;
  image: string;
  onClick: () => void;
}

const MainCard: React.FC<IMainCardProps> = ({ text, image, onClick }) => {
  return (
    <Card className={styles.cardStyle} onClick={() => onClick()}>
      <CardMedia className={styles.cardImageStyle} image={image} />
      <CardContent className={styles.cardTextStyle}>
        <Typography
          variant="h6"
          component="span"
          className={styles.cardNameStyle}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MainCard;
