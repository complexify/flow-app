import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/interfaces/interfaces";
// import { invoke } from "@tauri-apps/api";
const COOKIE_NAME = "authToken";
const USER_ID = "userId";
const COOKIE_EXPIRATION_DAYS = 30;

export async function login(authToken: string, userId: string) {
  Cookies.set(COOKIE_NAME, authToken, {
    expires: COOKIE_EXPIRATION_DAYS,
    secure: true,
  });
  Cookies.set(USER_ID, userId, {
    expires: COOKIE_EXPIRATION_DAYS,
    secure: true,
  });
}

export function logout() {
  Cookies.remove(COOKIE_NAME);
  Cookies.remove(USER_ID);
}

export async function getUser() {
  return Cookies.get(COOKIE_NAME);
}

export async function getUserStruct(token: string): Promise<User> {
  console.log(token)
  const response = await axios.get<User>(
    `https://discord.com/api/v10/users/@me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}
