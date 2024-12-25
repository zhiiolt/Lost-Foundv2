/** @format */

import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import {
  jenis as jenisLaporan,
  statuses as statusLaporan,
  kategori as kategoriLaporan,
} from "./data";

const laporan = Array.from({ length: 100 }, () => ({
  id: `LAP-${faker.number.int({ min: 1000, max: 9999 })}`,
  judul: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  jenis: faker.helpers.arrayElement(jenisLaporan).value,
  status: faker.helpers.arrayElement(statusLaporan).value,
  kategori: faker.helpers.arrayElement(kategoriLaporan).value,
  tanggal: faker.date.between({ from: new Date("2023-01-01"), to: new Date() }),
  lokasi: faker.location.streetAddress(),
}));

fs.writeFileSync(
  path.join(__dirname, "laporan.json"),
  JSON.stringify(laporan, null, 2)
);

console.log("✅ Laporan data generated.");
