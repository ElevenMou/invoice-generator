"use client";

import {
  BuildingOffice2Icon,
  Cog8ToothIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";

import { twMerge } from "tailwind-merge";
import MenuIcon from "./MenuIcon";
import UserInfo from "./UserInfo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const pathname = usePathname();
  const t = (key: string) => key;

  const itemStyle =
    "flex items-center gap-4 p-2 rounded-xl w-full max-w-full overflow-hidden";
  const activeItemStyle = "bg-primary_5 text-neutral_0";
  const hoverItemStyle = "hover:bg-background";

  return (
    <nav
      id="app-side-menu"
      className="fixed z-50 flex flex-col top-24 bottom-4 left-0 bg-card w-side-menu overflow-hidden px-4 py-6 rounded-tr-xl rounded-br-xl shadow-md shadow-card transition-all duration-300"
    >
      <ul className="flex flex-col gap-4 flex-1">
        <li className="hidden md:list-item">
          <MenuIcon />
        </li>
        <li>
          <Link
            href="/dashboard"
            className={twMerge(
              itemStyle,
              pathname === "/dashboard" ? activeItemStyle : hoverItemStyle
            )}
            title={t("dashboard")}
          >
            <div>
              <RectangleGroupIcon className="w-6 h-6" />
            </div>
            {t("dashboard")}
          </Link>
        </li>
        <li>
          <Link
            href="/invoices"
            className={twMerge(
              itemStyle,
              pathname.startsWith("/invoices")
                ? activeItemStyle
                : hoverItemStyle
            )}
            title={`${t("invoice")}s`}
          >
            <div>
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            {`${t("invoice")}s`}
          </Link>
        </li>
        <li>
          <Link
            href="/clients"
            className={twMerge(
              itemStyle,
              pathname.startsWith("/clients") ? activeItemStyle : hoverItemStyle
            )}
            title={`${t("client")}s`}
          >
            <div>
              <UserGroupIcon className="w-6 h-6" />
            </div>
            {`${t("client")}s`}
          </Link>
        </li>
        <li>
          <Link
            href="/companies"
            className={twMerge(
              itemStyle,
              pathname.startsWith("/companies")
                ? activeItemStyle
                : hoverItemStyle
            )}
            title={t("companies")}
          >
            <div>
              <BuildingOffice2Icon className="w-6 h-6" />
            </div>
            {t("companies")}
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={twMerge(
              itemStyle,
              pathname === "/settings" ? activeItemStyle : hoverItemStyle
            )}
            title={t("settings")}
          >
            <div>
              <Cog8ToothIcon className="w-6 h-6" />
            </div>
            {t("settings")}
          </Link>
        </li>
      </ul>
      <div className="block justify-center md:hidden">
        <UserInfo />
      </div>
    </nav>
  );
};

export default SideMenu;
