import ContentTop from "@/components/layout/ContentTop";
import DashboardContent from "./DashboardContent";

export const metadata = {
  title: "Dashboard",
};
const Dashboard = () => {
  return (
    <>
      <ContentTop>
        <h1>Dashboard</h1>
      </ContentTop>
      <DashboardContent />
    </>
  );
};

export default Dashboard;
