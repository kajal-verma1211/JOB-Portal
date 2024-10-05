import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const RandomJob = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <Navbar />
      <div>
        <h1 className="font-bold text-xl my-10">Search Results ({RandomJob.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {RandomJob.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
