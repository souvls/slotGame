"use client";
import { useState } from 'react';
import { GoCopy } from "react-icons/go";
interface Props {
    Username: string;
    Password: string;
}
const CopyButton: React.FC<Props> = ({ Username, Password }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`Username: ${Username}, Password: ${Password}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // รีเซ็ตสถานะหลัง 2 วินาที
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div>
            <button onClick={handleCopy}>
                {copied ? <GoCopy color='blue' /> : <GoCopy />}
            </button>
        </div>
    );
};

export default CopyButton;
