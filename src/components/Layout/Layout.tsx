import React from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

// Layout Pattern allow us to deconstruct a page into a series of components.
// Many of these components are often reused between pages. For example, you
// might have the same navigation bar and footer on every page.
export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
