import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

  
  const {user}= useSelector(store=>store.auth)


  return (
    <div className="bg-white mt-6">
      <div className="flex item-center justify-between mx-auto max-w-7xl h-16">
        <div>
          
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex item-center gap-12 mt-6">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
          </ul>

          {
            !user ? (
              <div className="flex item-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#6717f1]">SignUp</Button></Link>
              </div>
            ):(
              <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                  <h4 className="font-medium ">Kajal Verma</h4>
                  <p className="text-sm text-muted-foreground">Lorem ipsum dolar sit amet.</p>
                  </div>
                </div>
  
                <div className=" flex flex-col my-2 text-gray-600">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2/>
                <Button variant="link">View Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut/>
                  <Button variant="link">Log Out</Button>
                </div>
                </div>
              </PopoverContent>
            </Popover>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;