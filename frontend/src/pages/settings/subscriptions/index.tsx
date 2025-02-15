import Button from "../../../components/button";
import SubscriptionArticle from "./subscription";
import { SubscriptionArticleProps } from "../types";
import Modal from "../../../components/modal";

const subscriptions: SubscriptionArticleProps[] = [
  {
    id: 1,
    fullname: "Firstname Lastname",
    price: 15,
    description: "this is just a test for subscriptions and groups",
    profession: ["Actor", "Singer"],
    image: "person-04.png",
  },
  {
    id: 2,
    fullname: "Firstname Lastname",
    price: 15,
    description: "this is just a test for subscriptions and groups",
    profession: ["Actor", "Singer"],
    image: "person-04.png",
  },
  {
    id: 3,
    fullname: "Firstname Lastname",
    price: 15,
    description: "this is just a test for subscriptions and groups",
    profession: ["Actor", "Singer"],
    image: "person-04.png",
  },
  {
    id: 4,
    fullname: "Firstname Lastname",
    price: 15,
    description: "this is just a test for subscriptions and groups",
    profession: ["Actor", "Singer"],
    image: "person-04.png",
  },
];

export default function Subscriptions() {
  const createNewChannel = () => {};

  return (
    <div className="max-w-[800px] min-h-screen">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Channels and Subscriptions
      </h1>
      <section className="w-full flex justify-between">
        <Modal
          call={<Button text="Create Channel" onClick={createNewChannel} />}
          content={<></>}
          cancelText="Cancel"
          saveText="Save Channel"
          title="Create new Channel"
          onSave={async () => {}}
        />
      </section>
      <section className="flex flex-col gap-4 mt-10">
        {subscriptions.map((sub) => (
          <SubscriptionArticle key={sub.id} sub={sub} />
        ))}
      </section>
    </div>
  );
}
