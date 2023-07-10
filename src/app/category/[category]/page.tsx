"use client";
import MainCard from "@/components/MainCard/MainCard";
import SideMenu from "@/components/SideMenu";
import cardsConfig from "@/utils/cardsConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import TrainCard from "@/components/TrainCard/TrainCard";

export default function Category({ params }: { params: { category: string } }) {
  const router = useRouter();

  const cardsIndex = cardsConfig.categories.findIndex(
    (category) => category.url === params.category
  );

  const cards = cardsConfig.cards[cardsIndex];

  return (
    <main>
      <SideMenu router={router} />
      <Container
        maxWidth={false}
        style={{
          justifyContent: "center",
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card) => (
          <TrainCard {...card} key={card.word}/>
        ))}
      </Container>
    </main>
  );
}
