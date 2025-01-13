import Navbar from '@/app/member/component/Navbar';
import { GetServerSideProps } from 'next';
import React from 'react'
import "@/app/globals.css";
interface UserProps {
    user: {
        id: string;
        name: string;
        email: string;
    };
}
const page = ({ user }: UserProps) => {
    return (
        <div>
            <h1>User Information</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    // Fetch user data from an API or database

    const user = {
        id: id,
        name: "sou",
        email: "sou"
    };

    if (!user) {
        return {
            notFound: true, // Render 404 page if user not found
        };
    }

    return {
        props: { user }, // Pass user data to the component
    };
};
export default page