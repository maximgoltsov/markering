import React from "react";
import "./index.scss";
import MarketingForm from "./widgets/MarketingForm";
import Header from "./widgets/Header";
import CloudSvg from "./assets/img/cloud.svg";
import Cloud1Svg from "./assets/img/cloud-1.svg";
import Cloud2Svg from "./assets/img/cloud-2.svg";
import Cloud3Svg from "./assets/img/cloud-3.svg";
import Cloud4Svg from "./assets/img/cloud-4.svg";
import Cloud5Svg from "./assets/img/cloud-5.svg";

const AppContent = () => {
  // const hello = trpc.useQuery(["hello"]);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <MarketingForm />
      </div>
      <div className="clouds">
        <img src={CloudSvg} className="clouds_cloud" />
        <img src={Cloud1Svg} className="clouds_cloud1" />
        <img src={Cloud2Svg} className="clouds_cloud2" />
        <img src={Cloud3Svg} className="clouds_cloud3" />
        <img src={Cloud4Svg} className="clouds_cloud4" />
        <img src={Cloud5Svg} className="clouds_cloud5" />
      </div>
    </div>
  );
};

export default AppContent;
