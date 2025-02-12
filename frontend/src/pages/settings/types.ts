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
  onChangeContact: () => Promise<void> | void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>, contactName: bgColor) => void
}