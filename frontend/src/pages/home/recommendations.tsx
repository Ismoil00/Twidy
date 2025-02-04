/* temporary - will be deleted soon */
import Card from "./card";
import { CardType } from "./types";

const recommendedCards = [
  {
    id: 1,
    img: "assets/person-01.jpeg",
    fullname: "Ekaterina Varnava",
    describtion: "Actor and showman. Host of the Evening Urg program...",
    category: "musician",
    price: 10,
  },
  {
    id: 2,
    img: "assets/person-02.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
  {
    id: 3,
    img: "assets/person-03.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
  {
    id: 4,
    img: "assets/person-04.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
  {
    id: 5,
    img: "assets/person-05.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
  {
    id: 6,
    img: "assets/person-06.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
  {
    id: 7,
    img: "assets/person-07.png",
    fullname: "Айза Анюхина",
    describtion: "Российская бьюти-блогер, бывшая жена Тимати ре... ",
    category: "musician",
    price: 10,
  },
];

export default function Recommendations() {
  const handleCardSelection = (card: CardType) => {};

  return (
    <>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        We Recommend
      </h1>
      <section className="flex justify-center sm:justify-start flex-wrap gap-8">
        {recommendedCards.map((card: CardType) => (
          <Card key={card.id} card={card} onClick={handleCardSelection} />
        ))}
      </section>
    </>
  );
}
