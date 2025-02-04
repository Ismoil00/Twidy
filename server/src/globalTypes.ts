type UUID = string;

interface UserData {
  userId: UUID;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  professions: number[];
  description: string | null;
  profileImg: string | null;
  bankAccount: number | 0;
  socialMedias: {
    [key: string]: string | null;
  };
  createdAt: string;
  updatedAt: string | null;
}

export { UserData };
