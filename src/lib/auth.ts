import Cookies from "js-cookie";
import { invoke } from "@tauri-apps/api";
import { User } from "@/interfaces/interfaces";
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

export function getUser() {
  return Cookies.get(COOKIE_NAME);
}

export function getUserId() {
  return Cookies.get(USER_ID);
}


export async function getUserStruct(token: string): Promise<User> {
  const response: User = await invoke("get_user", { token });
  return response;
}
