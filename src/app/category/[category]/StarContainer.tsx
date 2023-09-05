"use client";
import Image from "next/image";

export interface IStarContainerProps {
  answers: boolean[];
}

const StarContainer: React.FC<IStarContainerProps> = ({ answers }) => {
  return (
    <>
      {answers.map((answer, index) => (
        <Image
          key={index}
          alt="star"
          width={50}
          height={50}
          src={answer ? "/assets/img/star-win.svg" : "/assets/img/star.svg"}
        />
      ))}
    </>
  );
};

export default StarContainer;
