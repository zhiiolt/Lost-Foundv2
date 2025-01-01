/** @format */

import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

async function addComent(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, {
    method: "POST",
    body: JSON.stringify({
      laporanId: data.laporanId,
      userId: data.userId,
      isi: data.isi,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    return [];
  }
}

export function useSubmitCommentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addComent,
    onSuccess: async (newCommet) => {},
    onError(error, variables, context) {
      console.log(error.message);
    },
  });

  return mutation;
}
