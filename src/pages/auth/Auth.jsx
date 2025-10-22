// React hooks for component state management
import React from 'react'
import { useState } from 'react'

// Asset imports for UI images
import Background from '@/assets/login2.png'      // Background image (not currently used)
import Victory from "@/assets/victory.svg"        // Victory emoji for welcome section

// UI component imports from shadcn/ui library
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"  // Tab navigation for login/signup
import { Input } from "@/components/ui/input"     // Input fields for forms
import { Button } from "@/components/ui/button"   // Buttons for form submission

// Notification system for user feedback
import { toast } from "sonner"                    // Toast notifications for errors/success

// API client for backend communication
import { apiClient } from "@/lib/api-client"      // Axios instance configured for API calls

// API route constants
import { SIGNUP_ROUTE } from '@/utils/constants'  // Signup endpoint: "api/auth/signup"
import {LOGIN_ROUTE} from '@/utils/constants'     // Login endpoint: "api/auth/login"
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'


const Auth = () => {
   // State management for form inputs
   const [email, setEmail] = useState("")                    // User's email input
   const [password, setPassword] = useState("")              // User's password input
   const [confirmPassword,setConfirmPassword]=useState("")   // Password confirmation for signup
   const navigate=useNavigate();
   const {setUserInfo}=useAppStore();
    

   const validateLogin=()=>{
    // Check if email field is empty
    if(!email.length){
        toast.error("Email is required");      // Show error notification
        return false;
    }
    // Check if password field is empty
    if(!password.length){
        toast.error("Password is required");   // Show error notification
        return false;
    }
    return true;  // All validations passed
   }
  
   const validateSignup=()=>{
    // Check if email field is empty
    if(!email.length){
         toast.error("Email is required");     // Show error notification
         return false;
    }
    // Check if password field is empty
    if(!password.length){
      toast.error("Password is required");    // Show error notification
      return false;
    }
    // Check if passwords match (signup specific validation)
    if(password !== confirmPassword){
      toast.error("Passwords do not match");  // Show error notification
      return false;
    }
    return true  // All validations passed
  }

   /**
    * Handles user login process
    * Validates inputs, sends API request, and processes response
    */
   const handleLogin=async ()=>{
       // First validate the login form inputs
       if(validateLogin()){
        // Send login request to backend API
        const response=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
        console.log({response})  // Log response for debugging
        if(response.data.user.id){
          setUserInfo(response.data.user);
           if(response.data.user.profileSetup){
            navigate("/chat");
           }
           else{
            navigate("/profile");
           }
        }
       }
   }

   /**
    * Handles user signup/registration process
    * Validates inputs, sends API request, and processes response
    */
   const handleSignup=async()=>{
    // First validate the signup form inputs
    if(validateSignup()){
       // Send signup request to backend API with email and password
       const response =await apiClient.post(SIGNUP_ROUTE, {email,password},{withCredentials:true});
       console.log({response})  // Log response for debugging
       if(response.status===201){
         setUserInfo(response.data.user);
        navigate("/profile");
       }
    }
   }
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-100">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className='flex gap-10 items-center justify-center flex-col'>

          <div className='flex items-center justify-center flex-col'>
            <div className="flex items-baseline justify-center gap-2">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[80px] w-[80px]" />
            </div>
            <p className="text-center font-medium text-gray-600 mt-2">Fill in the details to get started</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue='login'>
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all">Signup</TabsTrigger>
              </TabsList>


              <TabsContent value="login" className='flex flex-col gap-5 mt-10'>
                    <Input type="email" placeholder="Email" value={email} className='rounded-full p-6 ' onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} className='rounded-full p-6 ' onChange={(e) => setPassword(e.target.value)} />
                     <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
              </TabsContent>


              <TabsContent value="signup" className='flex flex-col gap-5 mt-10'>
                    <Input type="email" placeholder="Email" value={email} className='rounded-full p-6 ' onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} className='rounded-full p-6 ' onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} className='rounded-full p-6 ' onChange={(e) => setConfirmPassword(e.target.value)} />
                     <Button className='rounded-full p-6' onClick={handleSignup}>SignUp</Button>

              </TabsContent>
            </Tabs>
          </div>

        </div>
        <div className=" hidden xl:flex flex justify-center items-center ">
          <img src={Background} alt="background login" className="h-[700px]"/>
        </div>
      </div>
    </div>
  )
}

export {Auth}
