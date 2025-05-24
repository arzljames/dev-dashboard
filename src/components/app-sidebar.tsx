import React from "react";
import BrandLogo from "@/assets/brand-logo.png";
import { NAVIGATION_LINKS } from "@/constant";
import { useRouterState, Link } from "@tanstack/react-router";

const AppSiderbar: React.FC = () => {
  const navigationLinks = NAVIGATION_LINKS ?? [];
  const { location } = useRouterState();
  const [showDrawer, setShowDrawer] = React.useState<boolean>(true);

  return (
    <div
      className={`${showDrawer ? "w-72" : "w-20"} hidden transition md:flex flex-col px-4 py-8`}
    >
      <div
        className="cursor-pointer  w-full h-20 "
        onClick={() => setShowDrawer(!showDrawer)}
      >
        <img src={BrandLogo} alt="DevDashboard" className="w-[80%] h-auto" />
      </div>

      <ul>
        {navigationLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <Link to={link.path}>
              <li
                key={index}
                className={`mb-3 flex flex-row items-center  ${showDrawer ? "justify-start w-full" : "justify-center w-10 h-10"} rounded-full cursor-pointer hover:text-blue-900 transition duration-150 px-4 py-2 ${isActive ? "text-blue-900 font-medium bg-blue-50" : "text-slate-400"}`}
              >
                <link.icon
                  size={18}
                  className={showDrawer ? "mr-4 " : "mr-0"}
                />
                {showDrawer && link.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AppSiderbar;
