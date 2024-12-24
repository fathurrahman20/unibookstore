import { ReactNode } from "react";

export const metadata = {
  title: "Unibookstore - Admin",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-10">{children}</div>;
};

export default AdminLayout;
