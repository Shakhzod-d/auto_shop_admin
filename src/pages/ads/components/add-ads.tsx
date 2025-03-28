import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchItemsServ, postItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/news-store";
import toast from "react-hot-toast";
import { AddAdsForm } from "./ads-form";
import { AdsRes } from "@/types/ads.type";
const API = import.meta.env.VITE_API_URL;
export const AddAds = () => {
  const navigate = useNavigate();
  // get Category
  const { formVariant, setFormVariant } = useNewsStore();

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchNewsData"] as any);
  };

  //  create news

  const { mutate: createAds, isPending: loading } = useMutation({
    mutationFn: (obj: AdsRes) => postItemsServ(`${API}/ad`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/ads");
        toast.success("Muvoffaqiyatli qo'shildi");
        handleInvalidate();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // edit news
  const { mutate: editAds, isPending: editLoading } = useMutation({
    mutationFn: (obj: AdsRes) =>
      patchItemsServ(`${API}/ad/${formVariant.id}`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/ads");
        toast.success("Muvoffaqiyatli tahrirlandi");
        setFormVariant({ id: "", role: "create" });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: AdsRes) {
    console.log(data);

    if (formVariant.role == "edit") {
      editAds(data);
    } else {
      createAds(data);
    }
  }

  return (
    <div className="p-4">
      <AddAdsForm submit={onSubmit} loading={loading || editLoading} />
    </div>
  );
};
