import { useState } from "react";
import ContactCard from "./contactCard";
import { ContactProps, bgColor, ServiceProps } from "../types";
import ServiceCard from "./serviceCard";

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
  const [services, setServices] = useState<ServiceProps[]>([
    {
      id: 1,
      name: "English Lesson1",
      description: "One individual lesson in English",
      price: 255,
      active: true,
    },
    {
      id: 2,
      name: "English Lesson2",
      description: "One individual lesson in English",
      price: 2435,
      active: false,
    },
    {
      id: 3,
      name: "English Lesson3",
      description: "One individual lesson in English",
      price: 445,
      active: true,
    },
    {
      id: 4,
      name: "English Lesson4",
      description: "One individual lesson in English",
      price: 226,
      active: false,
    },
    {
      id: 5,
      name: "English Lesson5",
      description: "One individual lesson in English",
      price: 875,
      active: true,
    },
  ]);

  const handleContactChange = () => {};

  const handleContactPriceChange = (
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
        {contacts.map((contact: ContactProps) => (
          <ContactCard
            key={contact.contactName}
            {...contact}
            onChangeContact={handleContactChange}
            handleContactPriceChange={handleContactPriceChange}
          />
        ))}
      </section>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Services
      </h1>
      <section className="flex flex-wrap gap-8">
        {services.map((service: ServiceProps) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </section>
    </div>
  );
}
