import { PiWhatsappLogo } from "react-icons/pi";
import { Link } from "react-router-dom";

export const WhatsAppButton = ({
  phoneNumber,
  message,
  className,
}: {
  phoneNumber: string;
  message?: string;
  className?: string;
}) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator?.userAgent);

  const formattedPhoneNumber = "92" + phoneNumber?.slice(1);

  const baseUrl = isMobile
    ? `https://wa.me/${formattedPhoneNumber}`
    : `https://web.whatsapp.com/send?phone=${formattedPhoneNumber}`;

  const url = message
    ? `${baseUrl}&text=${encodeURIComponent(message)}`
    : baseUrl;

  return (
    <Link to={url} target="_blank">
      <PiWhatsappLogo className={className} color="green" />
    </Link>
  );
};
