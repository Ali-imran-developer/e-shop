import { schema } from '../schema';

const Step5 = ({ formData, updateFormData }) => {
  const options = schema.inventory.options;

  const handleSelect = (value) => {
    updateFormData(value);
  };

  return (
    <div>
      <div className="space-y-4 mt-8">
        {options.map((option) => (
          <div 
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              formData === option.value
                ? 'border-2 border-blue-600' 
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-gray-800 font-semibold">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step5;