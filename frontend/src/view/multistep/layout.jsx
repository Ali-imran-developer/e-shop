import {
  PiArrowLeftLight,
  PiArrowUpLight,
  PiArrowUpRightLight,
  PiCheck,
} from "react-icons/pi";
import { Button } from "rizzui";
import Header from "./header";
import { schema } from "./schema";

const Layout = ({
  children,
  formData,
  currentStep,
  totalSteps,
  handleNext,
  handleBack,
  isLoading,
  handleSubmit,
  isLastStep,
  isFirstStep,
  isValid,
}) => {
  const stepKeys = Object.keys(schema);
  const currentQuestion = schema[stepKeys[currentStep - 1]]?.question || "";

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8a1331] to-[#6a2678] flex items-center justify-center px-4 py-10">
      <Header className="absolute top-4 left-4" formData={formData} />
      <div className="max-w-full w-full flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between mx-8">
        <div className="text-white w-full lg:w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-11 bg-white/[.35]"></div>
            <span className="text-lg font-medium">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold max-w-md">
            {currentQuestion}
          </div>
        </div>

        <div className="max-w-2xl w-full lg:w-full bg-white rounded-xl shadow-md">
          <div className="p-6">
            <div className="mb-6">{children}</div>
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              {!isFirstStep && (
                <Button
                  onClick={handleBack}
                  className="font-semibold rounded-full text-white bg-blue-600"
                >
                  <PiArrowLeftLight className="me-2" /> Back
                </Button>
              )}

              {!isLastStep ? (
                <Button
                  onClick={handleNext}
                  disabled={!isValid}
                  rounded="pill"
                  className={`${
                    !isValid ? "opacity-70 cursor-not-allowed text-black" : ""
                  }`}
                >
                  Next <PiArrowUpLight className="rotate-90 ms-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  isLoading={isLoading}
                  rounded="pill"
                  className={`${
                    !isValid ? "opacity-70 cursor-not-allowed text-black" : ""
                  }`}
                >
                  Submit <PiCheck className="ms-2 mt-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
