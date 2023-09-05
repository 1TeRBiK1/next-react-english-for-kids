"use client";
import SideMenu from "@/components/SideMenu/SideMenu";
import { ICard } from "@/types/cards";
import { useState } from "react";
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
