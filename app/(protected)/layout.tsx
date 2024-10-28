import SideMenu from "@/components/layout/SideMenu";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="md:p-6 p-4">
      <SideMenu />
      {children}
    </div>
  );
};

export default layout;
