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
