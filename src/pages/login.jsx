import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );
      setCookie("token", res.data.token);
      console.log("Token set:", res.data.token);

      // Arahkan pengguna ke halaman utama setelah login
      router.push("/"); // <-- Di sini
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
