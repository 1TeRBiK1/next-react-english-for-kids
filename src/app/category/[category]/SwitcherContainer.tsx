"use client";
import SideMenu from "@/components/SideMenu";
import TrainCard from "@/components/TrainCard/TrainCard";
import { ICard } from "@/types/cards";
import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import GameContainer from "./GameContainer";

interface ISwitcherContainerProps {
  cards: ICard[];
}

const SwitcherContainer: React.FC<ISwitcherContainerProps> = ({ cards }) => {
  const [isGameMode, setIsTrainMode] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsTrainMode((prev) => !prev);
  };

  return (
    <>
      <SideMenu isGameMode={isGameMode} toggleSwitch={toggleSwitch} />
      <GameContainer isGameMode={isGameMode} cards={cards} />
    </>
  );
};

export default SwitcherContainer;
