import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const DetailMenu = () => {
  const router = useRouter();
  const { idMakanan } = router.query;
  const [foodDetail, setFoodDetail] = useState(null);

  useEffect(() => {
    if (idMakanan) {
      const token = getCookie("token");
      axios
        .get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${idMakanan}`, {
          headers: {
            "Content-Type": "application/json",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Food detail:", response.data);
          setFoodDetail(response.data.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
          alert("Error fetching food details");
        });
    }
  }, [idMakanan]);

  if (!foodDetail) return <div>Loading...</div>;

  return (
    <div>
      <h1>{foodDetail.name}</h1>
      <img src={foodDetail.imageUrl} alt={foodDetail.name} />
      <p>Date Created: {new Date(foodDetail.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default DetailMenu;
