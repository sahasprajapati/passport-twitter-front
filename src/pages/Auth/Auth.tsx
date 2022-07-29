import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Splash } from "../../components/Splash/Splash";

export const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // if (isLoggedIn()) {
    //   navigate("/");
    // }
    setLoading(false);
  }, []);
  return loading ? (
    <Splash />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};
