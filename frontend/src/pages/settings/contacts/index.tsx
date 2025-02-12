import { useState } from "react";
import ContactCard from "./contactCard";
import { ContactProps, bgColor, ServiceProps } from "../types";
import ServiceCard from "./serviceCard";
import Input from "../../../components/input";
import CustomSwitch from "../../../components/switch";
import Modal from "../../../components/modal";
import { FaPlus } from "react-icons/fa6";

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
  const [newService, addNewService] = useState<ServiceProps>({
    id: "",
    name: "",
    description: "",
    price: 0,
    active: true,
  });

  /* CONTACT */
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

  const handleContactChangeSave = async () => {};

  /* SERVICE */
  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => {
    const { name, value, checked, type } = e.target;
    const filteredValue: string | number | boolean =
      type === "checkbox" ? checked : value;

    const newServices = services.map((service: ServiceProps) =>
      service.id === id ? { ...service, [name]: filteredValue } : { ...service }
    );

    setServices(newServices);
  };

  const handleServiceChangeSave = async () => {};

  const handleAddNewService = async () => {};

  return (
    <div className="min-h-screen pb-10">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Contacts Prices
      </h1>
      <section className="flex flex-wrap gap-8">
        {contacts.map((contact: ContactProps) => (
          <ContactCard
            key={contact.contactName}
            {...contact}
            onContactChangeSave={handleContactChangeSave}
            handleContactPriceChange={handleContactPriceChange}
          />
        ))}
      </section>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Services
      </h1>
      <section className="flex flex-wrap gap-8">
        {services.map((service: ServiceProps) => (
          <ServiceCard
            key={service.id}
            {...service}
            handleServiceChange={handleServiceChange}
            handleServiceChangeSave={handleServiceChangeSave}
          />
        ))}
        <Modal
          call={
            <article className="w-full sm:w-[270px] h-[350px] rounded-20px flex flex-col p-10 justify-center items-center gap-10 bg-brand_blue relative z-0 cursor-pointer hover:bg-brand_blue/80 transition duration-200">
              <FaPlus className="size-44 text-brand_white" />
              <p className="text-brand_white font-700 text-xl">
                Add New Service!
              </p>
            </article>
          }
          content={
            <>
              <Input
                name="name"
                onChange={(e) =>
                  addNewService((p: ServiceProps) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                placeholder="service name"
                type="text"
                value={newService.name}
                label="Name"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <Input
                name="description"
                onChange={(e) =>
                  addNewService((p: ServiceProps) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                placeholder="service description"
                type="text"
                value={newService.description}
                label="Description"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <Input
                name="price"
                onChange={(e) =>
                  addNewService((p: ServiceProps) => ({
                    ...p,
                    price: Number(e.target.value),
                  }))
                }
                placeholder="service price"
                type="number"
                value={newService.price}
                label="Price"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <CustomSwitch
                name="active"
                checked={newService.active}
                onChange={(e) =>
                  addNewService((p: ServiceProps) => ({
                    ...p,
                    active: e.target.checked,
                  }))
                }
                tailwind="ml-3"
                label="Activity"
                labelTailwind="ml-4"
              />
            </>
          }
          cancelText="Close"
          saveText="Add"
          onSave={handleAddNewService}
          title="Add New Service"
        />
      </section>
    </div>
  );
}
