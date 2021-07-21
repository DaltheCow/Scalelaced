import { User } from "@firebase/auth-types";

export type UserInfo = {
  id: string;
  email: string | null;
  name: string | null;
};

export const mapUserData = (user: User) => {
  const { uid, email, displayName } = user;
  return <UserInfo>{
    id: uid,
    email,
    name: displayName,
  };
};
