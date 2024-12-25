/** @format */

import Header from "@/app/(user)/header";

export default async function SlugLaporanPage({ params }) {
  const { slug } = await params;
  console.log(slug);
  const breadcrumbs = [
    { title: "Laporan", url: "/laporan" },
    { title: slug },
    // halaman terakhir tanpa link
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4'>Halo ini Riwayat Laporan</div>
    </div>
  );
}
