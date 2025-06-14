import ResellingController from "@/controllers/myResellersController";
import { useState } from "react";
import toast from "react-hot-toast";

export const useManualOrders = () => {
  const [loading, setLoading] = useState(true);
  const [resellingUsers, setResellingUsers] = useState(null);
  const [modal, setModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState({ email: "" });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmRemove, setConfirmRemove] = useState("");

  const toggle = () => {
    setModal(!modal);
    setInviteEmail({ email: "" });
    setMessage("");
  };

  const handleconfirmToggle = () => {
    setConfirmRemove("");
  };

  const fetch = async () => {
    try {
      const { data } = await ResellingController.getAllResellers();
      setResellingUsers(data.seller);
      setLoading(false);
    } catch (error) {
      toast.error((error as any).message || "Failed to fetch reselling data!");
      console.log(error);
    }
  };

  const handleSendInvite = async (e: any) => {
    e.preventDefault();
    if (inviteEmail.email.trim()) {
      try {
        setInviteLoading(true);
        const { data } = await ResellingController.sendInviteForReselling(
          inviteEmail
        );
        let result = data.requestedReseller;
        toast.success(`Successfully sended Invite to ${result.userName}`);
        toggle();
      } catch (error) {
        setMessage((error as any).response.data.message || "Failed to send invite!");
        console.log(error);
      }
      setInviteLoading(false);
    } else {
      setMessage("Email required!");
    }
  };

  const handleConfirmInvite = async (flag: any, userId: any) => {
    try {
      setInviteLoading(true);

      const { data } = await ResellingController.confirmInviteForReselling({
        flag,
        reseller: { userId },
      });
      toast.success(data.message);
      setLoading(true);
      await fetch();
    } catch (error) {
      setMessage((error as any).response.data.message || "Failed to confirm invite!");
      console.log(error);
    }
    setInviteLoading(false);
  };

  const handleRemoveReseller = async (resellerAccountId: any) => {
    try {
      setInviteLoading(true);

      const { data } = await ResellingController.removeFromReselling({
        resellerAccountId,
      });
      toast.success(data.message);
      setLoading(true);
      handleconfirmToggle();
      await fetch();
    } catch (error) {
      setMessage((error as any).response.data.message || "Failed to remove!");
      console.log(error);
    }
    setInviteLoading(false);
  };

  return {
    fetch,
    loading,
    handleSendInvite,
    handleConfirmInvite,
    handleRemoveReseller,
    resellingUsers,
    inviteLoading,
    message,
    confirmRemove,
  };
};
