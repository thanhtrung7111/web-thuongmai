import React from "react";
import PersonalInfomationComponent from "@components/personalInfomation/PersonalInfomationComponent";
import { useSearchParams } from "react-router-dom";
const PersonalInfomation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  return <PersonalInfomationComponent tab={tab} />;
};

export default PersonalInfomation;
