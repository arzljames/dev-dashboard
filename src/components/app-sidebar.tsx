import React from "react";
import BrandLogo from "@/assets/brand-logo.png";
import { NAVIGATION_LINKS } from "@/constant";
import { useRouterState, Link } from "@tanstack/react-router";

const AppSiderbar: React.FC = () => {
  const navigationLinks = NAVIGATION_LINKS ?? [];
  const { location } = useRouterState();

  return (
    <div className="w-80 flex flex-col px-4 py-8">
      <div className="cursor-pointer mb-16">
        <img src={BrandLogo} alt="DevDashboard" className="w-52 h-auto" />
      </div>

      <ul>
        {navigationLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <Link to={link.path}>
              <li
                key={index}
                className={`w-full mb-3 text-lg flex flex-row items-center rounded-full cursor-pointer hover:text-blue-600 transition duration-150 px-5 py-3 ${isActive ? "text-blue-600 font-medium bg-blue-100" : "text-slate-400"}`}
              >
                <link.icon size={20} className="mr-4" />
                {link.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AppSiderbar;
