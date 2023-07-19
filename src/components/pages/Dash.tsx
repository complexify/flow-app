import { User } from "../../lib/getUser";

type props = {
  user: User;
};

const DashContent: React.FC<props> = ({}) => {
  return (
    <>
      <div className="">
        <h1>Dash</h1>
      </div>
    </>
  );
};

export default DashContent;
