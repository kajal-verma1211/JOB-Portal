
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import React from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "42k - 1 lakh", "1 lakh - 5 lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg text-[#9e7cb5]">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return(
                 <div className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item}/>
                <Label>{item}</Label>
              </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
