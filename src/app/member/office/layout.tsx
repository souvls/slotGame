"use client"
import { useRouter } from 'next/navigation'
import Navbar from '../component/Navbar';
import { useEffect, useState } from 'react';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [token, setToken] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
        const role = localStorage.getItem("role");
        if (!token && role !== "member") {
            router.push("/member")
        }
    }, [])
    return (
        <>
            <Navbar token={token}/>
            {children}
        </>
    )
}
export default layout