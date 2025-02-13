import History from "./history";
import { PaymentHistoryProps } from "../types";
import CurrentBalance from "./currentBalance";
import { CurrentBalanceProps } from "../types";

const paymentHistories: PaymentHistoryProps[] = [
  {
    id: 1,
    image: "person-03.png",
    fullname: "Abdulloev Ismoil",
    time: "3 hours ago",
    amount: 256,
    incoming: true,
  },
  {
    id: 2,
    image: "person-04.png",
    fullname: "Ismoilov Abdullo",
    time: "1 week ago",
    amount: 324,
    incoming: true,
  },
  {
    id: 3,
    image: "person-02.png",
    fullname: "Komilov Shahron",
    time: "10 days ago",
    amount: 123,
    incoming: false,
  },
  {
    id: 4,
    image: "person-05.png",
    fullname: "Ahrorov Buzurgmehr",
    time: "10 minutes ago",
    amount: 564,
    incoming: true,
  },
  {
    id: 5,
    image: "person-03.png",
    fullname: "Nasimov Umar",
    time: "2 hours ago",
    amount: 755,
    incoming: false,
  },
];

const currantBalance: CurrentBalanceProps = {
  currentBalance: 12000,
  totalIncomings: 8000,
  totalOutgoings: 4000,
};

export default function Finance() {
  return (
    <div className="min-h-screen pb-10">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Payments and Finances
      </h1>
      <section>
        <CurrentBalance {...currantBalance} />
      </section>

      {/* HISTORY */}
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        History
      </h1>
      <section className="max-w-[715px] flex flex-col gap-4 justify-center">
        {paymentHistories.map((history: PaymentHistoryProps) => (
          <History key={history.id} {...history} />
        ))}
      </section>
    </div>
  );
}
