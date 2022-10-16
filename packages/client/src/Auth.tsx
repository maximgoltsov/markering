import React from "react";
import { useEffect } from "react";
import { useTokenStore } from "./entities/token/models/tokenStore";

const Auth: React.FC = ({ children }) => {
  const { token, getToken } = useTokenStore();

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (token === "") return <div>Loading...</div>;

  return <>{children}</>;
};

export default Auth;
