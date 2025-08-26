import logo from '@assets/logo-app.png';
import { Link } from "react-router-dom";

function Logo({ size = "md" }) { 
  const sizeClasses = {
    sm: "w-8", 
    md: "w-12", 
    lg: "w-16", 
    xl: "w-20", 
  };

  return ( 
      <Link to="/">
        <img 
          src={logo} 
          alt="Chat App" 
          className={`${sizeClasses[size] || sizeClasses.md}`} 
        />
      </Link> 
  );
}

export default Logo;