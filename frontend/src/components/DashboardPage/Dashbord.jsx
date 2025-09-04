import DeshNavbar from "./DashNavbar";
import Left from "./leftSide/left";
import Right from "./rightSide/Right";
const Dashboard = () => {
  return (
    <>
      <DeshNavbar />
      <div className="flex w-full h-screen dark:bg-gray-800 fixed ">
        <Left></Left>
        <Right></Right>
      </div>
    </>
  );
};

export default Dashboard;
