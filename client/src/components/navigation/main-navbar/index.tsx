import React from "react";

// src
import MainDesktopNavbar from "components/navigation/main-navbar/desktop-navbar";

interface MainNavBarProps {}

const MainNavBar: React.FC<MainNavBarProps> = (props) => {
  return (
    <div className="MainNavBar">
      <MainDesktopNavbar />
    </div>
  );
};

export default MainNavBar;
