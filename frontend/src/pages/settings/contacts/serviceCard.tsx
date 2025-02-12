import { ServiceCardProps } from "../types";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import CustomSwitch from "../../../components/switch";

export default function ServiceCard({
  id,
  name,
  description,
  price,
  active,
  handleServiceChange,
  handleServiceChangeSave,
}: ServiceCardProps) {
  return (
    <article className="w-full sm:w-[270px] h-[350px] rounded-20px flex flex-col p-10 justify-between  bg-brand_white relative z-0">
      <section className="z-20">
        <h1 className="text-brand_text_primary font-700 text-lg">{name}</h1>
        <p className="text-brand_text_secondary mt-2 font-700 text-[18px]">
          {description}
        </p>
      </section>

      <span
        className={`absolute inset-0 flex justify-center items-center text-[50px] font-bold z-10
        ${active ? "text-brand_green/10" : "text-brand_text_secondary/10"}
        `}
      >
        {active ? "active" : "disabled"}
      </span>

      <section className="z-20">
        <h2 className="text-brand_text_primary font-700 text-4xl">{price}$</h2>
        <Modal
          call={
            <button className="text-brand_text_secondary hover:text-brand_text_primary transition duration-200 active:text-black mt-1 font-700 text-xl cursor-pointer">
              Change
            </button>
          }
          content={
            <>
              <Input
                name="name"
                onChange={(e) => handleServiceChange(e, id)}
                placeholder="service name"
                type="text"
                value={name}
                label="Name"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <Input
                name="description"
                onChange={(e) => handleServiceChange(e, id)}
                placeholder="service description"
                type="text"
                value={description}
                label="Description"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <Input
                name="price"
                onChange={(e) => handleServiceChange(e, id)}
                placeholder="service price"
                type="number"
                value={price}
                label="Price"
                inputTailwindUtilities="mb-4"
                labelTailwindUtilities="ml-4"
              />
              <CustomSwitch
                name="active"
                checked={active}
                onChange={(e) => handleServiceChange(e, id)}
                tailwind="ml-3"
                label="Activity"
                labelTailwind="ml-4"
              />
            </>
          }
          cancelText="Close"
          saveText="Save"
          onSave={handleServiceChangeSave}
          title={`Change Service ${name}`}
        />
      </section>
    </article>
  );
}
