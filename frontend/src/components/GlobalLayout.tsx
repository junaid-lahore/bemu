import React from "react";
import { NavigationBar } from "components/NavigationBar";
import { Footer } from "components/Footer";

interface Props {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-beamu-shadow-gray">
      <NavigationBar />
      <main className="flex-grow pt-20">{/* Add padding to offset fixed header */}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
