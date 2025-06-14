import { useNavigate } from "react-router-dom";
import { cardsData } from "@/data/reportData";

const Index = () => {
  const navigate = useNavigate();
  const handleNavigate = (data: any) => {
    const { link, name, title, breadCrumb } = data;
    navigate(`/reports/${link}`, {
      state: {
        name,
        title,
        breadCrumb,
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <h3 key={index} className="text-lg font-semibold mb-2 cursor-pointer rounded-lg shadow-md p-4 border" onClick={() => handleNavigate(card)}>
            {card.name}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Index;