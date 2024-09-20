import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const protectedRoutes = /^\/(menu|detail-menu|[a-zA-Z0-9-]+)$/;

  useEffect(() => {
    const token = getCookie("token");
    console.log("Current pathname:", router.pathname);

    if (!token && protectedRoutes.test(router.pathname)) {
      router.push("/login");
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
};

export default MyApp;
