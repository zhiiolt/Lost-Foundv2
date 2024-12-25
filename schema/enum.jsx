/** @format */

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react";

import {
  IconGhost2Filled,
  IconSquareRoundedLetterLFilled,
  IconSquareRoundedLetterFFilled,
  IconArrowElbowLeft,
  IconHash,
} from "@tabler/icons-react";

export const kategori = [
  {
    value: "elektronik",
    label: "Elektronik",
    icon: IconHash,
  },
  {
    value: "dokumen",
    label: "Dokumen",
    icon: IconHash,
  },
  {
    value: "hewan",
    label: "Hewan Peliharaan",
    icon: IconHash,
  },
  {
    value: "kunci",
    label: "Kunci",
    icon: IconHash,
  },
  {
    value: "aksesoris",
    label: "Aksesoris",
    icon: IconHash,
  },
  {
    value: "kendaraan",
    label: "Kendaraan",
    icon: IconHash,
  },
  {
    value: "pencurian",
    label: "Pencurian",
    icon: IconHash,
  },
  {
    value: "barang",
    label: "Barang Pribadi",
    icon: IconHash,
  },
];

export const jenis = [
  {
    value: "kehilangan",
    label: "Kehilangan",
    icon: IconSquareRoundedLetterLFilled,
  },
  {
    value: "penemuan",
    label: "Penemuan",
    icon: IconSquareRoundedLetterFFilled,
  },
];

export const statuses = [
  {
    value: "hilang",
    label: "Hilang",
    icon: HelpCircle,
  },
  {
    value: "dikembalikan",
    label: "Dikembalikan",
    icon: IconArrowElbowLeft,
  },
  {
    value: "ditemukan",
    label: "Ditemukan",
    icon: CheckCircle,
  },
];
