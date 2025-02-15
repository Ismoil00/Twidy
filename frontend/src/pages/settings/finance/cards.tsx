import { useState } from "react";
import BankCard from "../../../components/bankCard";
import { BankCardProps } from "../../../components/types";
import NewCard from "./newCard";

const cards = [
  {
    id: 1,
    number: 1111222233334444,
    name: "Ahrorov Buzurgmehr",
    type: "MasterCard",
    expiry: "02/27",
    cvc: "123",
  },
  {
    id: 2,
    number: 3333555566669999,
    name: "Ahrorov Buzurgmehr",
    type: "Visa",
    expiry: "05/28",
    cvc: "236",
  },
  {
    id: 3,
    number: 4444999977773333,
    name: "Ahrorov Buzurgmehr",
    type: "Korti Milli",
    expiry: "11/29",
    cvc: "968",
  },
];

export default function Cards() {
  const [open, setOpen] = useState<string | number>(cards[0].id);
  const [newCard, setNewCard] = useState<BankCardProps>({
    id: "",
    type: "",
    number: 0,
    expiry: "",
    cvc: "",
    name: "",
  });

  const deleteBankCard = (id: string | number) => {
    console.log("id", id);
  };

  const handleBankCardClick = async (card: BankCardProps) => {
    if (card.id !== open) {
      setOpen(card.id);
    } else {
      alert("MODAL MUST BE OPENED");
    }
  };

  const addNewBankCard = async () => {};

  return (
    <div className="flex flex-col gap-5">
      {cards.map((card) => (
        <BankCard
          key={card.id}
          {...card}
          open={open}
          deleteBankCard={deleteBankCard}
          handleBankCardClick={handleBankCardClick}
        />
      ))}
      <NewCard
        newCard={newCard}
        setNewCard={setNewCard}
        addNewBankCard={addNewBankCard}
      />
    </div>
  );
}
