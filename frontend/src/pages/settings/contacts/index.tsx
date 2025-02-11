import ContactCard from "./contactCard";

const contacts = [
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
];

export default function Contacts() {
  const handleContactChange = () => {};

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
          />
        ))}
      </section>
    </div>
  );
}
