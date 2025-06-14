import { Link, useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { Button } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { useMedia } from "@hooks/use-media";
import { siteConfig } from "@/config/site.config";
import AuthController from "@/controllers/authController";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Header({ className }) {
  const isMobile = useMedia("(max-width: 767px)", false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentlySelling: false,
    sellingChannels: [],
    salesChannel: false,
    products: [],
    inventory: "",
    resellersProducts: false,
    resellersOperate: [],
    manageResellers: "",
    primaryChallenge: "",
    sellProducts: "",
    viaDropshipping: "",
    hearAboutShopilam: "",
  });

  const handleClick = async () => {
    try {
      setLoading(true);
      await AuthController.shopilamSurvey(formData).then((e) =>
        toast.success(e.message)
      );
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setLoading(false);
      navigate("/products");
    }
  };

  return (
    <header
      className={cn(
        "flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10",
        className
      )}
    >
      <Link to={"/"}>
        <img
          src={isMobile ? siteConfig.icon : siteConfig.logo}
          alt={siteConfig.title}
          className="invert"
        />
      </Link>
      <div className="me-8">
        <Button
          rounded="pill"
          variant="outline"
          className="gap-2 whitespace-nowrap border-white text-white"
          isLoading={isLoading}
          onClick={handleClick}
        >
          <FiSave className="h-4 w-4" />
          Skip & Exit
        </Button>
      </div>
    </header>
  );
}
