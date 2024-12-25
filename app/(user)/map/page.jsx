/** @format */

import Header from "@/app/(user)/header";

export default function MapPage() {
  const breadcrumbs = [
    { title: "Map" },
    // halaman terakhir tanpa link
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4'>Halo ini Map</div>
    </div>
  );
}
