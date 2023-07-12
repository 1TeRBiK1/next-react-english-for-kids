import cardsConfig from "@/utils/cardsConfig";
import SwitcherContainer from "./SwitcherContainer";
import { useRouter } from "next/navigation";

export default function Category({ params }: { params: { category: string } }) {
  const cardsIndex = cardsConfig.categories.findIndex(
    (category) => category.url === params.category
  );

  const cards = cardsConfig.cards[cardsIndex];

  return (
    <main>
      <SwitcherContainer cards={cards} />
    </main>
  );
}
