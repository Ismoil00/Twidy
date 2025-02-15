import { IoClose } from "react-icons/io5";
import { BankCardCompProps } from "../../../components/types";
import Modal from "../../../components/modal";
import Input from "../../../components/input";

export default function BankCard({
  id,
  type,
  number,
  name,
  expiry,
  cvc,

  deleteBankCard,
  open,
  setOpen,
  setNewCard,
}: BankCardCompProps) {
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      {open === id ? (
        <Modal
          call={
            <OpenedCard
              id={id}
              type={type}
              number={number}
              name={name}
              deleteBankCard={deleteBankCard}
            />
          }
          content={
            <>
              <div className="flex flex-col gap-2">
                <p className="text-brand_text_secondary">
                  Card must meet certain requirements: be personal, not virtual,
                  and support direct debiting.
                </p>
                <Input
                  name="number"
                  placeholder="Card Number"
                  type="number"
                  value={number}
                  onChange={(e) => handleCardInputChange(e)}
                  inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
                  labelTailwindUtilities="hidden"
                />
                <section className="flex flex-col sm:flex-row gap-2">
                  <Input
                    name="expiry"
                    placeholder="Validity Period"
                    type="text"
                    value={expiry}
                    onChange={(e) => handleCardInputChange(e)}
                    inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
                    labelTailwindUtilities="hidden"
                  />
                  <Input
                    name="cvc"
                    placeholder="CVC/CVV"
                    type="number"
                    value={cvc}
                    onChange={(e) => handleCardInputChange(e)}
                    inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
                    labelTailwindUtilities="hidden"
                  />
                </section>
                <Input
                  name="name"
                  placeholder="Holder Name"
                  type="text"
                  value={name}
                  onChange={(e) => handleCardInputChange(e)}
                  inputTailwindUtilities="placeholder-brand_text_primary/70 placeholder:font-700 !text-brand_text_primary font-700"
                  labelTailwindUtilities="hidden"
                />
              </div>
            </>
          }
          onSave={async () => {}}
          title="Edit Bank Card"
          cancelText="Cancel Edit"
          saveText="Save Edit"
        />
      ) : (
        <div
          onClick={() => setOpen(id)}
          className="w-[325px] p-5 rounded-20px bg-brand_white flex flex-col cursor-pointer relative hover:shadow-xl transition duration-200"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              deleteBankCard(id);
            }}
            className="w-[50px] h-[50px] grid place-content-center group/x absolute top-0 right-0 z-30 cursor-pointer"
          >
            <IoClose className="text-brand_text_secondary size-8 group-hover/x:text-brand_text_primary transition duration-200" />
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-brand_text_primary font-700 text-lg capitalize">
              {type}
            </h1>
            <p className="text-brand_text_primary font-700 text-lg tracking-wide">
              {`*${String(number).slice(-4)}`}
            </p>
          </div>
          <p className="text-brand_text_secondary capitalize text-lg font-700">
            {name}
          </p>
        </div>
      )}
    </>
  );
}

interface OpenCardCompProps {
  id: string | number;
  type: string;
  number: number;
  name: string;
  deleteBankCard: (id: string | number) => void;
}

const OpenedCard = ({
  id,
  type,
  number,
  name,
  deleteBankCard,
}: OpenCardCompProps) => {
  return (
    <div className="w-[325px] p-5 h-[200px] rounded-20px bg-gradient-to-br from-brand_blue to-brand_light_blue flex flex-col justify-between cursor-pointer relative z-0 hover:shadow-xl transition duration-200">
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteBankCard(id);
        }}
        className="w-[50px] h-[50px] grid place-content-center group/x absolute top-0 right-0 z-30 cursor-pointer"
      >
        <IoClose className="text-brand_white size-8 group-hover/x:text-brand_white/50 transition duration-200" />
      </div>
      <img
        src="assets/elips-01.png"
        alt="card design elips 01"
        className="absolute top-0 right-0"
      />
      <img
        src="assets/elips-02.png"
        alt="card design elips 02"
        className="absolute top-20 right-0"
      />
      <img
        src="assets/elips-03.png"
        alt="card design elips 03"
        className="absolute top-0 right-[116px]"
      />
      <h1 className="text-brand_white font-extrabold text-2xl uppercase z-20">
        {type}
      </h1>
      <p className="text-brand_white font-700 tracking-wide z-20">
        {`${String(number).slice(0, 3)}........${String(number).slice(-3)}`}
      </p>
      <p className="text-brand_white uppercase font-700 z-20">{name}</p>
    </div>
  );
};
