import { useState } from "react";
import ContactCard from "./contactCard";
import { ContactProps, bgColor } from "../types";

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactProps[]>([
    {
      bgColor: "bg-brand_blue",
      icon: "chat",
      contactName: "Message Cost",
      price: 2,
    },
    {
      bgColor: "bg-brand_orange",
      icon: "call",
      contactName: "Call Cost",
      price: 241,
    },
    {
      bgColor: "bg-brand_light_blue",
      icon: "video-call",
      contactName: "Video Call Cost",
      price: 352,
    },
  ]);

  const handleContactChange = () => {};

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    contactName: bgColor
  ) => {
    const { name, value } = e.target;
    if (isNaN(Number(value))) return;

    const newContacts = contacts.map((el: ContactProps) =>
      el.contactName === contactName
        ? { ...el, [name]: Number(value) }
        : { ...el }
    );

    setContacts(newContacts);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Contacts Prices
      </h1>
      <section className="flex flex-wrap gap-8">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.contactName}
            {...contact}
            onChangeContact={handleContactChange}
            handlePriceChange={handlePriceChange}
          />
        ))}
      </section>
    </div>
  );
}
