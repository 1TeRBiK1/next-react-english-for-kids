"use client";
import styles from "./page.module.css";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useRouter } from "next/navigation";
import cardsConfig from "@/utils/cardsConfig";
import MainCard from "@/components/Cards/Main/MainCard";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

export default function Index() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div>
        <SideMenu />
      </div>
      <Container
        maxWidth={false}
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {cardsConfig.categories.map((category, index) => (
          <MainCard
            onClick={() => router.replace(`/category/${category.url}`)}
            text={category.name}
            image={`/${cardsConfig.cards[index][0].image}`}
            key={index}
          />
        ))}
      </Container>
    </main>
  );
}
