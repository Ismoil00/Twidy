import Modal from "../../../components/modal";
import { FaPlus } from "react-icons/fa6";
import { BankCardProps } from "../../../components/types";
import Input from "../../../components/input";

interface NewCardCompProps {
  newCard: BankCardProps;
  setNewCard: React.Dispatch<React.SetStateAction<BankCardProps>>;
  addNewBankCard: () => Promise<void>;
}

export default function NewCard({
  newCard,
  setNewCard,
  addNewBankCard,
}: NewCardCompProps) {
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  return (
    <Modal
      call={
        <h2 className="flex justify-center gap-2 items-center font-700 text-brand_text_primary group/add-card hover:text-brand_text_primary/70 cursor-pointer transition duration-200">
          <FaPlus className="text-brand_text_primary group-hover/add-card:text-brand_text_primary/70 transition duration-200" />
          Add New Card
        </h2>
      }
      content={
        <div className="flex flex-col gap-2">
          <p className="text-brand_text_secondary">
            In order to be able to link a card, it must meet certain
            requirements: be personal, not virtual, and support direct debiting.
          </p>
          <Input
            name="number"
            placeholder="Card Number"
            type="number"
            value={newCard.number}
            onChange={(e) => handleCardInputChange(e)}
            inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
            labelTailwindUtilities="hidden"
          />
          <section className="flex flex-col sm:flex-row gap-2">
            <Input
              name="expiry"
              placeholder="Validity Period"
              type="text"
              value={newCard.expiry}
              onChange={(e) => handleCardInputChange(e)}
              inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
              labelTailwindUtilities="hidden"
            />
            <Input
              name="cvc"
              placeholder="CVC/CVV"
              type="number"
              value={newCard.cvc}
              onChange={(e) => handleCardInputChange(e)}
              inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
              labelTailwindUtilities="hidden"
            />
          </section>
          <Input
            name="name"
            placeholder="Holder Name"
            type="text"
            value={newCard.name}
            onChange={(e) => handleCardInputChange(e)}
            inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
            labelTailwindUtilities="hidden"
          />
        </div>
      }
      cancelText="Cancel"
      saveText="Save New Card"
      title="Add new Bank Card"
      onSave={addNewBankCard}
    />
  );
}
