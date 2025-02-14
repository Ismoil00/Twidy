import Button from "../../../components/button";
import { CurrentBalanceCompProps } from "../types";

export default function CurrentBalance({
  currentBalance,
  totalIncomings,
  totalOutgoings,
}: CurrentBalanceCompProps) {
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

      <Button
        onClick={() => {}}
        text="Withdraw Money"
        tailwindUtilities="!bg-brand_orange mt-8"
        type="button"
      />
    </div>
  );
}
