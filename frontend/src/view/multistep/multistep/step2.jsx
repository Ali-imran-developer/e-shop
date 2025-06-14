import { schema } from "../schema";

const Step2 = ({ formData, updateFormData }) => {
  const question = schema.sellingChannels.question;
  const options = schema.sellingChannels.options;

  const handleToggle = (value) => {
    if (formData.includes(value)) {
      updateFormData(formData.filter((item) => item !== value));
    } else {
      updateFormData([...formData, value]);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`p-4 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
              formData.includes(option.value)
                ? "border-2 border-blue-600"
                : "border border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-gray-800 pb-2">{option.icon}</span>
            <span className="text-black font-semibold">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2;