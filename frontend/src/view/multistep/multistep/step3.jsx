import { schema } from '../schema';

const Step3 = ({ formData, updateFormData }) => {
  const question = schema.salesChannel.question;
  const options = schema.salesChannel.options;

  const handleSelect = (value) => {
    updateFormData(value);
  };

  return (
    <div>
      {/* <h3 className="text-2xl font-medium mb-4">{question}</h3> */}
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

export default Step3;