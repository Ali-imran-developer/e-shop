export const formatPhoneNumber = (
  value: string,
  options?: {
    maxLength?: number;
    allowedChars?: RegExp;
  }
) => {
  const maxLength = options?.maxLength || 11;

  if (!value) return "";

  // Strip everything except digits
  const sanitized = value.replace(/[^\d]/g, "");

  // If someone tries to enter +92, convert it to 0
  if (sanitized.startsWith("92") && sanitized.length > 2) {
    return "0" + sanitized.substring(2).slice(0, maxLength - 1);
  }

  // Ensure it always starts with "03" if user tries to enter a different prefix
  if (sanitized.length >= 2 && !sanitized.startsWith("03")) {
    return "03" + sanitized.slice(2, maxLength);
  }

  return sanitized.slice(0, maxLength);
};

export const phoneNumberValidator = {
  onChange: (e: any) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    return e;
  },
  pattern: {
    value: /^03\d{9}$/,
    message: "Phone number must be 11 digits starting with 03",
  },
  validate: (value: any) => {
    if (!value) return true; // Allow empty if not required

    const formatted = formatPhoneNumber(value);

    if (formatted.length !== 11) {
      return "Phone number must be exactly 11 digits";
    }

    if (!formatted.startsWith("03")) {
      return "Phone number must start with 03";
    }

    return true;
  },
};

export const usePhoneNumberMask = () => {
  const maskStateValue = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(formatPhoneNumber(e.target.value));
    };
  };

  const maskRHFValue = (
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = formatPhoneNumber(e.target.value);
      onChange(e);
    };
  };

  const maskFormikValue = (
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setFieldValue: (field: string, value: any) => void
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
      handleChange(e);
      setFieldValue(e.target.name, formatted);
    };
  };

  const handleAutoClearZero = (formik: any, fieldName: any) => ({
    onFocus: () => {
      if (formik.values[fieldName] === 0) {
        formik.setFieldValue(fieldName, '');
      }
    },
    onBlur: () => {
      if (formik.values[fieldName] === '') {
        formik.setFieldValue(fieldName, 0);
      }
    }
  });
  
  return {
    maskStateValue,
    maskRHFValue,
    handleAutoClearZero,
    maskFormikValue,
    formatPhoneNumber,
  };
};
