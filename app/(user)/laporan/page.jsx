/** @format */

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Header from "../header";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { laporanSchema } from "../laporan/riwayat/data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { kategori, statuses, jenis } from "@/schema/enum";
import { IconMessageCircle2Filled } from "@tabler/icons-react";
import { Laporan } from "./component/Laporan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconSearch } from "@tabler/icons-react";
import { cache } from "react";

export const metadata = {
  title: "Lost & Found: Daftar Laporan",
  description: "A task and issue tracker build using Tanstack Table.",
};

async function getLaporan() {
  const res = await fetch("http://localhost:3000/api/laporan", {
    cache: "no-store",
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    return [];
  }
}

export default async function LaporanPage() {
  const breadcrumbs = [
    { title: "Laporan" },
    // halaman terakhir tanpa link
  ];
  const laporan = await getLaporan();
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4 bg-slate-50'>
        <Laporan laporan={laporan} />
      </div>
    </div>
  );
}
