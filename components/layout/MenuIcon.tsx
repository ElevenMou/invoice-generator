"use client";

import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const MenuIcon = () => {
  return (
    <button
      onClick={() =>
        document.documentElement.classList.toggle("side-menu-open")
      }
      className="flex items-center gap-4 p-2 rounded-xl max-w-full overflow-hidden"
    >
      <Bars3CenterLeftIcon className="w-6 h-6" />
    </button>
  );
};

export default MenuIcon;
