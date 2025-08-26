import { useState } from 'react';
import { toast } from "react-toastify";
import Button from '../common/Button';

function Invite() {
    const [copied, setCopied] = useState(false);
    const inviteLink = window.location.origin+"/join";

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
        <div className='p-4 space-y-4'>
            <h2 className="text-xl font-semibold">Invite Your Friends</h2>
            <p className="text-sm text-gray-500">Share the chat app link with your friends:</p>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="border rounded px-3 py-2 w-full text-sm bg-slate-700"
                />
                <Button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</Button> 
            </div> 

            <Button onClick={handleShare}>Share via Device</Button> 
        </div>
    );
}

export default Invite;
