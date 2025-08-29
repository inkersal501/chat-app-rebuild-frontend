import { useState } from "react";
import Signin from "@components/auth/Signin";
import Signup from "@components/auth/Signup";
import Logo from "@components/common/Logo";
import { appName } from "@js/config";
import {useSelector} from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const [tab, setTab] = useState("signin");
    const {isLoggedin, user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedin && user) {
            navigate("/chat");
        }
    }, [isLoggedin, user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-900 px-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border-e-4 border-b-4 border-slate-400">
            
                <div className="flex items-center space-x-3 mb-6">
                    <Logo width={40} />
                    <h2 className="text-2xl font-bold text-gray-800">{appName}</h2>
                </div>
            
                <div className="flex border-b mb-6">
                    <button
                        onClick={() => setTab("signin")}
                        className={`w-1/2 py-2 font-medium cursor-pointer ${
                            tab === "signin" ? "border-b-2 border-[#1A2980] text-[#1A2980]" : "text-gray-500"
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setTab("signup")}
                        className={`w-1/2 py-2 font-medium cursor-pointer ${
                            tab === "signup" ? "border-b-2 border-[#1A2980] text-[#1A2980]" : "text-gray-500"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                {tab === "signin" ? ( <Signin /> ) : (
                    <Signup switchSignIn={()=>setTab("signin")}/>
                )}
            </div>
        </div>
    );
};

export default Auth;
