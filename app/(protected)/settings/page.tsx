import ContentTop from "@/components/layout/ContentTop";
import Card from "@/components/UI/Card";
import { ThemeSwitcher } from "@/components/UI/ThemeSwitcher";
import React from "react";

export const metadata = {
  title: "Settings",
};
const SettingsPage = async () => {
  return (
    <>
      <ContentTop>
        <h1>Settings</h1>
      </ContentTop>
      <Card>
        <h2 className="mb-4">Theme</h2>
        <div className="w-56">
          <ThemeSwitcher />
        </div>
      </Card>
    </>
  );
};

export default SettingsPage;
