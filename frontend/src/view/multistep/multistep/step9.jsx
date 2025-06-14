import { schema } from '../schema';

const Step9 = ({ formData, updateFormData }) => {
  const question = schema.primaryChallenge.question;
  const options = schema.primaryChallenge.options;

  const handleSelect = (value) => {
    updateFormData(value);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {options.map((option) => (
          <div 
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-4 min-h-[100px] flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
              formData === option.value
                ? 'border-2 border-blue-600' 
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-gray-800 font-semibold text-center">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step9;