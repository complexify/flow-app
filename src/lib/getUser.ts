import axios from "axios";

export type User = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

export default async function getUser(token: string): Promise<User> {
  const response = await axios.get<User>(
    `https://discord.com/api/v10/users/@me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}
