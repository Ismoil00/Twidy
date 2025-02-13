import { PaymentHistoryCardProps } from "../types";

export default function History({
  image,
  fullname,
  time,
  amount,
  incoming,
}: PaymentHistoryCardProps) {
  return (
    <>
      {/* DESCKTOP + LAPTOP VERSION */}
      <div className="w-full hidden sm:flex flex-row flex-wrap justify-between items-center p-4 rounded-20px bg-bg-brand_white cursor-pointer hover:shadow-xl transition duration-300 active:bg-brand_white/50">
        <section className="flex items-center gap-5">
          <img
            src={`assets/${image}`}
            alt={`${fullname} photo`}
            className="w-[80px] h-[80px] rounded-16px object-cover object-center"
          />
          <p className="text-brand_text_primary font-700 capitalize">
            {fullname}
          </p>
        </section>

        <p className="text-brand_text_secondary font-700">{time}</p>
        <p
          className={`font-700 text-xl ${
            incoming ? "text-brand_orange" : "text-brand_text_secondary"
          }`}
        >
          {incoming ? `+${amount}$` : `-${amount}$`}
        </p>
      </div>

      {/* MOBILE VERSION */}
      <div className="w-full sm:hidden flex flex-row gap-3 items-center p-4 rounded-20px bg-brand_white cursor-pointer hover:shadow-xl transition duration-300 active:bg-brand_white/50">
        <img
          src={`assets/${image}`}
          alt={`${fullname} photo`}
          className="w-[80px] h-[90px] rounded-16px object-cover object-center"
        />

        <section className="flex flex-col gap-1">
          <p className="text-brand_text_primary font-700 capitalize">
            {fullname}
          </p>
          <p className="text-brand_text_secondary font-700">{time}</p>
          <p
            className={`font-700 text-xl ${
              incoming ? "text-brand_orange" : "text-brand_text_secondary"
            }`}
          >
            {incoming ? `+${amount}$` : `-${amount}$`}
          </p>
        </section>
      </div>
    </>
  );
}
