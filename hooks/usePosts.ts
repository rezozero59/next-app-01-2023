import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts`);
      return data;
    },
  });
};
