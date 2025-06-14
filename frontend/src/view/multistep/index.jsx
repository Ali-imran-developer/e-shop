import { useState } from "react";
import Step1 from "./multistep/step1";
import Step2 from "./multistep/step2";
import Step3 from "./multistep/step3";
import Step4 from "./multistep/step4";
import Step5 from "./multistep/step5";
import Step6 from "./multistep/step6";
import Step7 from "./multistep/step7";
import Step8 from "./multistep/step8";
import Step9 from "./multistep/step9";
import Step10 from "./multistep/step10";
import Step11 from "./multistep/step11";
import Step12 from "./multistep/step12";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthController from "@/controllers/authController";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentlySelling: null,
    sellingChannels: [],
    salesChannel: null,
    products: [],
    inventory: "",
    resellersProducts: null,
    resellersOperate: [],
    manageResellers: "",
    primaryChallenge: "",
    sellProducts: "",
    viaDropshipping: "",
    hearAboutShopilam: "",
  });

  const handleNext = () => {
    if (currentStep === 1 && formData.currentlySelling === false) {
      return setCurrentStep(9);
    }  
    if (currentStep === 2 && formData.sellingChannels.length > 1) {
      return setCurrentStep(4);
    }
    setCurrentStep(prev => {
      if (prev < 12) return prev + 1;
      return prev;
    });
  };  

  const handleBack = () => {
    if (currentStep === 9 && formData.currentlySelling === false) {
      return setCurrentStep(1);
    }
    if (currentStep === 4 && formData.sellingChannels.length > 1) {
      return setCurrentStep(2);
    }
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
  };  

  const handleSubmit = async () => {
    let payload = { ...formData };
    if (formData.currentlySelling === false) {
      payload.salesChannel = false;
      payload.resellersProducts = false;
    }
    try {
      setLoading(true);
      await AuthController.shopilamSurvey(payload).then((e) =>
        toast.success(e.message)
      );
      console.log("Fetched data:", formData);
      navigate("/products");
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (step, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [step]: value,
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.currentlySelling !== null;
      case 2:
        return formData.sellingChannels.length > 0;
      case 3:
        return formData.salesChannel !== null;
      case 4:
        return formData.products.length > 0;
      case 5:
        return formData.inventory !== null && formData.inventory !== "";
      case 6:
        return formData.resellersProducts !== null;
      case 7:
        return formData.resellersOperate.length > 0;
      case 8:
        return (
          formData.manageResellers !== null && formData.manageResellers !== ""
        );
      case 9:
        return (
          formData.primaryChallenge !== null && formData.primaryChallenge !== ""
        );
      case 10:
        return formData.sellProducts !== null && formData.sellProducts !== "";
      case 11:
        return (
          formData.viaDropshipping !== null && formData.viaDropshipping !== ""
        );
      case 12:
        return (
          formData.hearAboutShopilam !== null &&
          formData.hearAboutShopilam !== ""
        );
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData.currentlySelling}
            updateFormData={(value) =>
              updateFormData("currentlySelling", value)
            }
          />
        );
      case 2:
        return (
          <Step2
            formData={formData.sellingChannels}
            updateFormData={(value) => updateFormData("sellingChannels", value)}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData.salesChannel}
            updateFormData={(value) => updateFormData("salesChannel", value)}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData.products}
            updateFormData={(value) => updateFormData("products", value)}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData.inventory}
            updateFormData={(value) => updateFormData("inventory", value)}
          />
        );
      case 6:
        return (
          <Step6
            formData={formData.resellersProducts}
            updateFormData={(value) =>
              updateFormData("resellersProducts", value)
            }
          />
        );
      case 7:
        return (
          <Step7
            formData={formData.resellersOperate}
            updateFormData={(value) =>
              updateFormData("resellersOperate", value)
            }
          />
        );
      case 8:
        return (
          <Step8
            formData={formData.manageResellers}
            updateFormData={(value) => updateFormData("manageResellers", value)}
          />
        );
      case 9:
        return (
          <Step9
            formData={formData.primaryChallenge}
            updateFormData={(value) =>
              updateFormData("primaryChallenge", value)
            }
          />
        );
      case 10:
        return (
          <Step10
            formData={formData.sellProducts}
            updateFormData={(value) => updateFormData("sellProducts", value)}
          />
        );
      case 11:
        return (
          <Step11
            formData={formData.viaDropshipping}
            updateFormData={(value) => updateFormData("viaDropshipping", value)}
          />
        );
      case 12:
        return (
          <Step12
            formData={formData.hearAboutShopilam}
            updateFormData={(value) =>
              updateFormData("hearAboutShopilam", value)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      formData={formData}
      currentStep={currentStep}
      totalSteps={12}
      handleNext={handleNext}
      handleBack={handleBack}
      isLoading={loading}
      handleSubmit={handleSubmit}
      isLastStep={currentStep === 12}
      isFirstStep={currentStep === 1}
      isValid={isStepValid()}
    >
      {renderStep()}
    </Layout>
  );
};

export default MultiStepForm;
