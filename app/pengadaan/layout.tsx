import { ReactNode } from "react";

export const metadata = {
  title: "Unibookstore - Pengadaan",
};

const PengadaanLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="p-10">{children}</main>
    </>
  );
};

export default PengadaanLayout;
