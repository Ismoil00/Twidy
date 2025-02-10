import { useState } from "react";
import General from "./general";
import Contacts from "./contacts";
import Finance from "./finance";
import Subscriptions from "./subscriptions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
// import Profile from "./general/profile";

const CustomTab = styled(Tab)(() => ({
  width: "auto",
  padding: "0",
  fontSize: "1rem",
  fontFamily: "Nunito",
  color: "#8C8CB6",
  "&.Mui-selected": {
    color: "#615DFA",
  },
  textTransform: "none",
  marginRight: "20px",
  "&:last-child": {
    marginRight: "0",
  },
}));

const tabs = [
  { label: "General", component: <General /> },
  { label: "Contacts", component: <Contacts /> },
  { label: "Finance and Payments", component: <Finance /> },
  { label: "Channels and Subscriptions", component: <Subscriptions /> },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-full bg-brand_gray pt-10 sm:pt-5 overflow-hidden">
      <Box>
        <Tabs
          onChange={(e: React.SyntheticEvent, tab: number) => setActiveTab(tab)}
          value={activeTab}
          aria-label="Customized Tabs"
          selectionFollowsFocus
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#615DFA",
              height: "5px",
              borderRadius: "5px",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <CustomTab key={index} label={tab.label} />
          ))}
        </Tabs>
        <Box>{tabs[activeTab].component}</Box>
      </Box>
      {/* <Profile /> */}
    </div>
  );
}
