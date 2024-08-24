import React from "react";

const CommandOutput: React.FC = () => {
  return (
    <div
      style={{
        overflowWrap: "break-word",
      }}
    >
      {/* {renderOutput(output)} */}
      Output
    </div>
  );
};

// const renderOutput = (output: unknown) => {
//   console.log("render output", output);
//   switch (typeof output) {
//     case "string":
//       console.log("string output");
//       return <>{output}</>;
//     case "object":
//       console.log("object output");
//       if (Array.isArray(output)) {
//         return output.map((line, index) => (
//           <Fragment key={index}>
//             {line}
//             <br />
//           </Fragment>
//         ));
//       }
//     default:
//       return null;
//   }
// };

export default CommandOutput;
