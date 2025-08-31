import logo from '@assets/logo-app.png';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function Logo({ size = "md" }) { 
  const { user } = useSelector((state) => state.auth);
  const sizeClasses = {
    sm: "w-8", 
    md: "w-12", 
    lg: "w-16", 
    xl: "w-20", 
  };

  return ( 
      <Link to={`${user ? "/chat": "/"}`}>
        <img 
          src={logo} 
          alt="Chat App" 
          className={`${sizeClasses[size] || sizeClasses.md}`} 
        />
      </Link> 
  );
}

export default Logo;