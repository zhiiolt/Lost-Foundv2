/** @format */

"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import { MapPinned, MoreHorizontal, Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EditForm from "@/components/forms/laporan/Edit";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import photo from "@/assets/avatar/olly.jpg";
import { kategori, statuses, jenis } from "@/schema/enum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { DialogLaporan } from "../../component/DialogLaporan";
import { laporanSchema } from "../data/schema";
import {
  IconHash,
  IconHeartFilled,
  IconInfoOctagonFilled,
  IconMessage2Filled,
  IconSquareRoundedLetterFFilled,
  IconSquareRoundedLetterLFilled,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  console.log(row);
  const router = useRouter();
  const laporan = laporanSchema.parse(row.original);
  const [open, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showDetailDialog, setShowDetailDialog] = React.useState(false);
  const status = statuses.find((s) => s.value === laporan.status);
  const formattedDate = formatDate(laporan.tanggal);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
            <MoreHorizontal />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px] bg-white'>
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={() => setShowDetailDialog(true)}>
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={() => setIsOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer text-red-500 hover:bg-red-100 hover:text-red-700'
            onSelect={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetContent
          style={{ maxWidth: "60vw" }}
          className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Edit Laporan</SheetTitle>
            <SheetDescription>
              Ubah detail laporanmu di sini. Klik simpan setelah selesai.
            </SheetDescription>
          </SheetHeader>
          <EditForm laporan={laporan} setIsOpen={setIsOpen} />
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={(isOpen) => setShowDeleteDialog(isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin ingin menghapus laporan{" "}
              <span className='font-extrabold'>"{laporan.judul}"</span>?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Laporan ini tidak akan lagi
              dapat diakses oleh Anda atau pihak lain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={isLoading}
              className='bg-red-600 hover:bg-red-700'
              onClick={async () => {
                setIsLoading(true);
                const res = await fetch(
                  `http://localhost:3000/api/laporan?id=${laporan.id}`,
                  {
                    method: "DELETE",
                  }
                );
                if (res.ok) {
                  router.refresh();
                  setShowDeleteDialog(false);
                  setIsLoading(false);
                  toast("", {
                    position: "top-right",
                    description: (
                      <div className='flex gap-2 items-center'>
                        <IconInfoOctagonFilled className='text-red-500' />
                        <p className='text-slate-950'>
                          Laporan{" "}
                          <span className='font-bold'>{laporan.judul}</span>{" "}
                          berhasil dihapus.
                        </p>
                      </div>
                    ),
                  });
                } else {
                  setShowDeleteDialog(false);
                  setIsLoading(false);
                  toast("", {
                    position: "top-right",
                    description: (
                      <div className='flex gap-2 items-center'>
                        <IconInfoOctagonFilled className='text-red-500' />
                        <p className='text-slate-950'>
                          Laporan{" "}
                          <span className='font-bold'>{laporan.judul}</span>{" "}
                          gagal dihapus.
                        </p>
                      </div>
                    ),
                  });
                }
              }}>
              {isLoading && <Loader2 className='animate-spin' />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DialogLaporan
        laporan={row.original}
        open={showDetailDialog}
        setIsOpen={setShowDetailDialog}
      />
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy", { locale: id });
}
