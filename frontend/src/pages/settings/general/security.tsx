import Sessions from "./sessions";
import Button from "../../../components/button";

export default function Security() {
  return (
    <div className="max-w-[700px]">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Security
      </h1>
      <section className="flex gap-5 items-center">
        <Button onClick={() => {}} text="2Factor Auth" />
        <p className="text-brand_text_secondary font-600">
          You can set a password that will be requested after the verification
          code.
        </p>
      </section>
      <section className="mt-10 flex flex-col gap-5 ml-5">
        <h2 className="text-brand_text_primary font-700">Active Sessions</h2>
        <p className="text-brand_text_secondary font-600">
          Shows information about which devices and at what time you accessed
          your account. If you suspect that someone else has gained access, you
          can terminate their activity at any time.
        </p>
      </section>
      <section className="mt-10">
        <Sessions />
      </section>
    </div>
  );
}
