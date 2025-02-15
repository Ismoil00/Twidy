import Button from "../../../components/button";
import { CurrentBalanceCompProps } from "../types";
import Modal from "../../../components/modal";
import CustomCheckbox from "../../../components/checkbox";
import { useState } from "react";

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

export default function CurrentBalance({
  currentBalance,
  totalIncomings,
  totalOutgoings,
}: CurrentBalanceCompProps) {
  const [chosenCard, setChosenCard] = useState(cards[0]);

  return (
    <div className="w-[285px] flex flex-col items-center sm:items-start gap-2">
      <p className="text-brand_text_secondary capitalize ml-1 font-700">
        Current Balance
      </p>
      <h1 className="text-brand_text_primary font-700 text-4xl">
        {currentBalance} USD
      </h1>

      <section className="flex gap-4 items-center mt-8">
        <div className="flex gap-2 items-center">
          <span className="w-[17px] h-[17px] rounded-full bg-brand_orange"></span>
          <p className="text-brand_text_primary font-700">+{totalIncomings}</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-[17px] h-[17px] rounded-full bg-brand_text_secondary"></span>
          <p className="text-brand_text_primary font-700">-{totalOutgoings}</p>
        </div>
      </section>
      <Modal
        call={
          <Button
            onClick={() => {}}
            text="Withdraw Money"
            tailwindUtilities="!bg-brand_orange mt-8"
            type="button"
          />
        }
        content={
          <div className="flex flex-col gap-4">
            <h2 className="text-brand_text_secondary">
              Select a card to deposit funds. The system commission is 8% + 0.5
              USD.
            </h2>
            {cards.map((card) => (
              <div
                onClick={() => setChosenCard({ ...card })}
                className="w-full p-5 rounded-20px bg-brand_gray flex justify-between items-center cursor-pointer relative hover:shadow-xl transition duration-200"
              >
                <div key={card.id} className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-brand_text_primary font-700 text-lg capitalize">
                      {card.type}
                    </h1>
                    <p className="text-brand_text_primary font-700 text-lg tracking-wide">
                      {`*${String(card.number).slice(-4)}`}
                    </p>
                  </div>
                  <p className="text-brand_text_secondary capitalize text-lg">
                    {card.name}
                  </p>
                </div>
                <CustomCheckbox checked={chosenCard.id === card.id} />
              </div>
            ))}
          </div>
        }
        onSave={async () => {}}
        title="Request for Withdrawal"
        cancelText="Cancel Withdraw"
        saveText="Withdraw"
      />
    </div>
  );
}
