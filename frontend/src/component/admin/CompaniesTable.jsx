import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const {companies} = useSelector(store=>store.company)

  
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies.length <= 0 ? <span>You haven't registered any company yet !</span> :(
              <>
              {
                companies?.map((company)=>{
                  return(
                    <div key={company._id}>
                    <TableCell>
                    <Avatar>
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s" />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className="flex items-center gap-2 w-fit cursor-pointer ">
                                <Edit2 className="w-4"/>
                                <span>Edit</span>
                            </div>
        
                        </PopoverContent>
                    </Popover>
                  </TableCell>
                  </div>
                  )
                })
              }
             </>
            )
          }
          
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
