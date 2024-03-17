export type AuthType = {
  email?: string;
  password: string;
  uniqueID?: string;
};

export type RegistrationValues = {
  password: string;
  email: string;
  username: string;
};

export type LoginValues = {
  usercreds: string;
  password: string;
};
