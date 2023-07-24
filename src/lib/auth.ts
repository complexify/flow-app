import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/interfaces/interfaces";
// import { invoke } from "@tauri-apps/api";
const COOKIE_NAME = "authToken";
const COOKIE_EXPIRATION_DAYS = 30;

export async function login(authToken: string) {
  Cookies.set(COOKIE_NAME, authToken, {
    expires: COOKIE_EXPIRATION_DAYS,
    secure: true,
  });
  return true;
}

export function logout() {
  Cookies.remove(COOKIE_NAME);
  return true;
}

export async function getUser() {
  return Cookies.get(COOKIE_NAME);
}

export async function getUserStruct(token: string): Promise<User> {
  const response = await axios.get<User>(
    `https://discord.com/api/v10/users/@me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}
