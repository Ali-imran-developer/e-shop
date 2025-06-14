import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import { Button } from "rizzui";
import { useNavigate } from "react-router-dom";
import SalesChannelTable from "./salesChannel-list/table";
import { useEffect, useState } from "react";
import AuthController from "@/controllers/authController";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { fetchAllStores } from "@/store/slices/storeSlice";

export const metadata = {
  ...metaObject("Sales Channel"),
};

const pageHeader = {
  title: "Sales Channel",
};

const SalesChannel = () => {
  const dispatch = useAppDispatch();
  const { StoresList, isLoading } = useAppSelector((state) => state.Stores);

  useEffect(() => {
    dispatch(fetchAllStores());

  },[])

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <SalesChannelTable channels={StoresList} loading={isLoading} />
    </>
  );
};

export default SalesChannel;
