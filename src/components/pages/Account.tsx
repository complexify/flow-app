import { User } from "../../lib/getUser";
import { Store } from "tauri-plugin-store-api";
import { useEffect } from "react";

type props = {
  user: User;
};
type TokenStorageProps = {
  value: string;
};

const store = new Store("token.dat");

const AccountContent: React.FC<props> = ({ user }) => {
  useEffect(() => {
    const getToken = async () => {
      const val = (await store.get("authToken")) as TokenStorageProps;
      console.log(val);
    };
    getToken();
    return () => {
      getToken();
    };
  }, []);

  async function logout() {
    await store.delete("authToken");
    const val = (await store.get("authToken")) as TokenStorageProps;
    console.log(val);
  }
  return (
    <>
      <div className="flex flex-col text-white">
        <h1>{user.username}</h1>
        <button className="p-2 m-2 bg-red-500 rounded-md w-24" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default AccountContent;
