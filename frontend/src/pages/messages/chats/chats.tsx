interface ChatProps {
  id: string | number;
  image: string;
  fullname: string;
  description: string;
  price: number;
  active: boolean;
}

const chats: ChatProps[] = [
  {
    id: 1,
    image: "person-04.png",
    fullname: "Firstname Lastname",
    description: "this is just a test for subscriptions and groups",
    price: 15,
    active: true,
  },
  {
    id: 2,
    fullname: "Firstname Lastname",
    price: 15,
    active: false,
    description: "this is just a test for subscriptions and groups",
    image: "person-03.png",
  },
  {
    id: 3,
    fullname: "Firstname Lastname",
    price: 15,
    active: true,
    description: "this is just a test for subscriptions and groups",
    image: "person-02.png",
  },
  {
    id: 4,
    fullname: "Firstname Lastname",
    price: 15,
    active: false,
    description: "this is just a test for subscriptions and groups",
    image: "person-04.png",
  },
];

export default function Chats() {
  return (
    <section className="flex flex-col gap-3">
      {chats.map((chat: ChatProps) => (
        <article
          key={chat.id}
          className="flex items-center gap-4 bg-brand_white rounded-16px p-3 hover:shadow-xl transition duration-200 cursor-pointer"
        >
          <div className="relative">
            {chat.active && (
              <span className="absolute -right-2 top-[40%] w-[15px] h-[15px] rounded-full bg-brand_green ring-brand_gray ring-4"></span>
            )}
            <img
              src={`assets/${chat.image}`}
              alt={`${chat.fullname} photo`}
              className="w-[70px] h-[80px] rounded-12px object-cover object-center"
            />
          </div>
          <div>
            <section className="flex gap-4">
              <p className="text-brand_text_primary font-700">
                {chat.fullname}
              </p>
              <p className="bg-brand_orange text-brand_white font-700 px-2 rounded-full">
                {chat.price}$
              </p>
            </section>
            <p className="text-brand_text_secondary font-700">
              {chat.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
