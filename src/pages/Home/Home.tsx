import { FC, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Splash } from "../../components/Splash/Splash";
import { profileService } from "../../service/profile.service";
import { isLoggedIn, logOut } from "../../utils/log.util";
import { ProfileDTO } from "../../utils/response";

export const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProfileDTO>();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    profileService()
      .then(({ success, data, message }) => {
        setLoading(false);
        setData(data);
      })
      .catch(() => {
        logOut();
        navigate("/login");
      });
  }, []);
  return loading ? (
    <Splash />
  ) : (
    <div>
      <Alert variant="primary">Welcome to Twitter Authentication.</Alert>
      <p>Id: {data?.id}</p>
      <p>Username: {data?.username}</p>
    </div>
  );
};
