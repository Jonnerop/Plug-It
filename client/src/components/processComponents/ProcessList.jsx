import React from "react";
import { processData } from "./processData";
import Process from "./Process";

function ProcessList() {
  return (
    <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap mx-10 p-2 max-w-screen-2xl my-8 bg-gradient-to-b from-darkerBlue to-darkBlue shadow-xl shadow-lightGreen rounded-md">
      {processData.map((item) => {
        return <Process key={item.id} {...item} />;
      })}
    </div>
  );
}

export default ProcessList;
