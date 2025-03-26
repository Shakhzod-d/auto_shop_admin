import { JSX } from "react";
import { Sidebar } from "./components/shared/sidebar";
import { Header } from "./components/shared/navbar";
interface Props {
  children: JSX.Element;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};
