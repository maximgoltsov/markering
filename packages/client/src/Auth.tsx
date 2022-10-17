import React from "react";
import { useEffect } from "react";
import { useTokenStore } from "./entities/token/models/tokenStore";
import Loader from "./shared/ui/Loader";

const Auth: React.FC = ({ children }) => {
  const { token, checkToken: getToken } = useTokenStore();

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (token === "")
    return (
      <div className="app app-loading">
        <Loader />
      </div>
    );

  return <>{children}</>;
};

export default Auth;
