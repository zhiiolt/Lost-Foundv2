/** @format */

import Header from "@/app/(user)/header";
import { Profil } from "./components/Profil";
import photo from "@/assets/avatar/olly.jpg";

export const metadata = {
  title: "Lost & Found: Profil",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function ProfilPage() {
  const breadcrumbs = [
    { title: "Profil" },
    // halaman terakhir tanpa link
  ];

  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='py-4 px-12'>
        <Profil />
      </div>
    </div>
  );
}
