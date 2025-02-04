export interface SessionComponentProps {
  session: UserSession;
  clicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
  deleteSession: (session: UserSession) => Promise<void>;
}

export interface LocalStorageSession {
  userId: string;
  sessionId: string;
  token: string;
  fullName: string;
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
