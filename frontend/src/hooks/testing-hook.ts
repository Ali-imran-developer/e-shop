import { useCallback, useState } from "react";
import NewsController from "@/controllers/testing-controller";
import { useAppDispatch } from "./store-hook";
import { setNews } from "@/store/slices/testing-slice";

export const useNews = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await NewsController.getNews();
      console.log("@Fetched Data:", data);
      dispatch(setNews(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    handleGetNews,
    isLoading,
  };
};
