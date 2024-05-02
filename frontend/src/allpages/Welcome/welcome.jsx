import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const dataParam = searchParams.get("data");

    if (dataParam) {
      const data = JSON.parse(decodeURIComponent(dataParam));
      const { token, name, role } = data;

      Cookies.set("token", token, { expires: 1 });
      Cookies.set("name", name);
      Cookies.set("role", role);

      const savedData = {
        token: Cookies.get("token"),
        name: Cookies.get("name"),
        role: Cookies.get("role"),
      };
      console.log("Saved JSON data:", savedData);
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h1>Welcome Page</h1>
    </div>
  );
};

export default Welcome;