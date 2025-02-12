import { PaymentHistoryCardProps } from "../types";

export default function History({
  image,
  fullname,
  time,
  amount,
  incoming,
}: PaymentHistoryCardProps) {
  return (
    <div className="w-full flex flex-wrap justify-between items-center p-8 rounded-20px bg-brand_white">
      <section className="flex items-center gap-5">
        <img
          src={`assets/${image}`}
          alt={`${fullname} photo`}
          className="w-[70px] h-[80px] rounded-16px object-cover object-center"
        />
        <p className="text-brand_text_primary font-700 capitalize">
          {fullname}
        </p>
      </section>

      <p className="text-brand_text_secondary font-700">{time}</p>
      <p
        className={`font-700 ${
          incoming ? "text-brand_orange" : "text-brand_text_secondary"
        }`}
      >
        {amount}
      </p>
    </div>
  );
}
