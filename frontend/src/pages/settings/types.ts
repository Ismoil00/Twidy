export interface SessionComponentProps {
  session: UserSession;
  clicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
  deleteSession: (session: UserSession) => Promise<void>;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  ip: string;
  location: string;
  browser: string;
  createdAt: string;
}

export interface UserSessions {
  currentSession: UserSession | null;
  otherSessions: UserSession[] | null;
}

export interface SocialMediaProps {
  icon: string;
  name: string;
  onClick: () => void;
}

export interface NewWebsiteProps {
  name: string;
  url: string;
}

export type bgColor = "Message Cost" | "Call Cost" | "Video Call Cost";

export interface ContactProps {
  bgColor: "bg-brand_blue" | "bg-brand_orange" | "bg-brand_light_blue";
  icon: "chat" | "call" | "video-call";
  contactName: "Message Cost" | "Call Cost" | "Video Call Cost";
  price: number;
}

export interface ContactCardProps extends ContactProps {
  onContactChangeSave: () => Promise<void> | void;
  handleContactPriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    contactName: bgColor
  ) => void;
}

export interface ServiceProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  active: boolean;
}

export interface ServiceCardProps extends ServiceProps {
  handleServiceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => void;
  handleServiceChangeSave: () => Promise<void>;
}

export interface PaymentHistoryProps {
  id: string | number;
  image: string;
  fullname: string;
  time: string;
  amount: number;
  incoming: boolean;
}

export interface PaymentHistoryCardProps extends PaymentHistoryProps {}

export interface CurrentBalanceProps {
  currentBalance: number;
  totalIncomings: number;
  totalOutgoings: number;
}

export interface CurrentBalanceCompProps extends CurrentBalanceProps {}

export interface SubscriptionArticleProps {
  id: string | number;
  fullname: string;
  price: number;
  description: string;
  profession: string[];
  image: string;
}

export interface SubscriptionArticleCompProps {
  sub: SubscriptionArticleProps;
}