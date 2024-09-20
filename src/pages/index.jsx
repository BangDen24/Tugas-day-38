import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";

const ListMenu = ({ foods }) => {
  return (
    <div>
      <h1>List Menu</h1>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <Link href={`/${food.id}`}>
              {food.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const token = getCookie("token", { req: context.req, res: context.res });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        foods: res.data.data,
      },
    };
  } catch (error) {
    console.error("Failed to fetch foods:", error.message);
    return {
      props: {
        foods: [],
      },
    };
  }
};

export default ListMenu;
