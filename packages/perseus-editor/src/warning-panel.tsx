// import React, { useState } from "react";
// import Banner from "@khanacademy/wonder-blocks-banner";

// interface WarningPanelProps {
//   widgetAccessibility: boolean;
// }

// const WarningPanel: React.FC<WarningPanelProps> = ({ widgetAccessibility }) => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   if (widgetAccessibility === false) { // Show banner only when we explicitly know the widget is inaccessible
//     return (
//       <Banner
//         text={isCollapsed ? "Widget inaccessible." : "This widget is marked as inaccessible. Consider using an alternative to support all learners."}
//         kind="warning"
//         layout="full-width"
//         actions={[
//           {
//             type: "button",
//             title: isCollapsed ? "Expand" : "Collapse",
//             onClick: toggleCollapse
//           }
//         ]}
//       />
//     );
//   }

//   return null; // No banner will show if widget is accessible
// };

// export default WarningPanel;
