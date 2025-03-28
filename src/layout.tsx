import { JSX } from "react";
import { Sidebar } from "./components/shared/sidebar";
import { Header } from "./components/shared/navbar";
import { DeleteModal } from "./components/shared/delete-modal";
import { useStore } from "./store";
import { Toaster } from "react-hot-toast";
interface Props {
  children: JSX.Element;
}
export const Layout = ({ children }: Props) => {
  const { deleteAction } = useStore();
  return (
    <div className="flex h-screen overflow-hidden ">
      {deleteAction.openModal && <DeleteModal />}
      <Sidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full">
        <Header />
        <div className="overflow-auto h-[94.5vh]">
          <main className="px-4 mt-10">{children}</main>
        </div>
      </div>
    </div>
  );
};
