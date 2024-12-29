/** @format */

import { IconHeartFilled } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function LikeButton({ laporanId, initialState }) {
  const queryClient = useQueryClient();
  const queryKey = ["laporan", laporanId];
  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const data = (
        await fetch(`http://localhost:3000/api/likes?id=${laporanId}`)
      ).json();
      return data;
    },
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = data.isLiked
        ? await fetch(`http://localhost:3000/api/likes?id=${laporanId}`, {
            method: "DELETE",
          })
        : await fetch(`http://localhost:3000/api/likes?id=${laporanId}`, {
            method: "POST",
          });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, () => ({
        likes: (previousState?.likes || 0) + (previousState.isLiked ? -1 : 1),
        isLiked: !previousState?.isLiked,
      }));
      return { previousState };
    },
    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context.previousState);
      console.log(err);
      toast.error("Gagal menyukai laporan");
    },
  });

  return (
    <span
      className={`${
        data.isLiked ? "text-pink-700" : "text-slate-400"
      } flex gap-1 text-sm items-center`}>
      <Button
        onClick={() => {
          mutate();
        }}
        type='button'
        variant='ghost'
        className='hover:bg-white hover:text-pink-300 px-2'>
        <IconHeartFilled className='h-6' /> {data.likes}
      </Button>
    </span>
  );
}
