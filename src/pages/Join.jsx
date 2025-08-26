import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@components/common/Button";
import Logo from "@components/common/Logo";
import { appName } from "@js/config";
import { toast } from "react-toastify";

function Join() {
    const [copied, setCopied] = useState(false);
    const inviteLink = `${window.location.origin}/join`;

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
        try {
            await navigator.share({
                title: "Join me on this chat app!",
                text: "Let's chat here:",
                url: inviteLink,
            });
        } catch (error) {
            console.error("Sharing failed:", error);
        }
        } else {
            toast.info("Sharing not supported. Try copying the link instead.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-900 px-6 text-center">
        
            <div className="mb-6 flex items-center space-x-3">
                <Logo size="lg" /> 
                <h1 className="text-2xl font-bold">{appName}</h1>                
            </div>
        
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Invite Friends to Chat
            </h1>
            <p className="text-gray-400 mb-6 text-sm md:text-base max-w-md">
                Share this invite link to let others join the conversation instantly.
            </p>
        
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 w-full max-w-lg shadow-lg">
                <p className="text-gray-400 text-xs mb-2 text-left">
                    Your Invite Link
                </p>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="flex-1 border border-slate-600 rounded-lg px-3 py-2 text-sm bg-slate-700 text-gray-200 focus:outline-none"
                    />
                    <Button onClick={handleCopy} className="shrink-0">
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                </div>
        
                <div className="flex flex-col md:flex-row gap-3 justify-center mt-5">
                    <Button onClick={handleShare}>Share via Device</Button>
                    <Link to="/">
                        <Button className="md:text-base">Sign Up Today!</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Join;
