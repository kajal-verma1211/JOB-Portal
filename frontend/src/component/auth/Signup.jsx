import { Label } from "@/components/ui/label";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";


const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password:"",
    role: "",
    file: "",
  });

  const navigate = useNavigate()
   const {loading} = useSelector(store=>store.auth)
   const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullname",input.fullname)
  formData.append("email",input.email)
  formData.append("phoneNumber",input.phoneNumber)
  formData.append("password",input.password)
  formData.append("role",input.role)

  if(input.file){
    formData.append("file",input.file)
  }

  try {
    dispatch(setLoading(true))
    const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
      headers:
      {"Content-Type":"multipart/form-data"},
      withCredentials:true
    })

    if(res.data.success){
      navigate("/login")
      toast.success(res.data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
    
  }finally{
    dispatch(setLoading(false))
  }
};

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-xl mb-5 ">Sign Up</h1>
          </div>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder=""
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder=""
            ></Input>
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder=""
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder=""
            ></Input>
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className=" flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2 ">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}
          <div className="flex justify-center items-center">
            <span className="text-sm">
              Already have an account ?
              <Link to="/login" className="text-blue-600 ">
                {" "}
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
