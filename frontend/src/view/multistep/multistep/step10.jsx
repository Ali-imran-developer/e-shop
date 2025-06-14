import { schema } from '../schema';

const Step10 = ({ formData, updateFormData }) => {
  const question = schema.sellProducts.question;
  const options = schema.sellProducts.options;

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
            <span className="text-black font-semibold">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step10;