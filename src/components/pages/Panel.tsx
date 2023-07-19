import { User } from "../../lib/getUser";

type props = {
  user: User;
};

const PanelContent: React.FC<props> = ({}) => {
  return (
    <>
      <div className="">
        <h1>Panel</h1>
      </div>
    </>
  );
};

export default PanelContent;
