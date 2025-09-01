import { useState, useEffect } from "react";
import Signin from "@components/auth/Signin";
import Signup from "@components/auth/Signup";
import Logo from "@components/common/Logo";
import { appName } from "@js/config";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; 
import { login } from "@store/authSlice";
import { authService } from "@js/index";

const Auth = () => {
    const [tab, setTab] = useState("signin");
    const {isLoggedin, user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isLoggedin && user) {
            navigate("/chat");
        }
        //eslint-disable-next-line
    }, [isLoggedin, user])

    const handleGoogleLogin = async (credentialResponse) => {
        try {
          const idToken = credentialResponse.credential;
           
          const user = await authService.googleSignIn(idToken);
    
          if (user) {
            dispatch(login({ ...user }));
            navigate("/chat");
          }
        } catch (error) {
          console.error("Google login error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-900 px-6">
            
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border-e-4 border-b-4 border-yellow-500">
            
                <div className="flex items-center space-x-3 mb-6">
                    <Logo width={40} />
                    <h2 className="text-2xl font-bold text-gray-100">{appName}</h2>
                </div>
            
                <div className="flex border-b border-slate-800 mb-6">
                    <button
                        onClick={() => setTab("signin")}
                        className={`w-1/2 py-2 font-medium cursor-pointer ${
                            tab === "signin" ? "border-b-2 border-white text-white" : "text-gray-500"
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setTab("signup")}
                        className={`w-1/2 py-2 font-medium cursor-pointer ${
                            tab === "signup" ? "border-b-2 border-white text-white" : "text-gray-500"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                {tab === "signin" ? ( <Signin /> ) : (
                    <Signup switchSignIn={()=>setTab("signin")}/>
                )}

                <p className="text-center text-white my-4">or</p>
                <div className="w-full flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => console.log("Google Login Failed")} 
                        size="medium"
                        theme="outline"
                        text="continue_with"  
                        ux_mode="popup"
                    />
                </div>
            </div>
        </div>
    );
};

export default Auth;
