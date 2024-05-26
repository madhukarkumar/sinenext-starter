"use client";
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
}
    from "@nextui-org/table";

const columns = [
    { key: "Image_URL", label: "Profile" },
    { key: "FirstName", label: "First Name" },
    { key: "LastName", label: "Last Name" },
    { key: "Email", label: "Email" },
    { key: "Company", label: "Company" },
];
const randomNumber = Math.floor(Math.random() * 500) + 1;
interface User {
    ID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Company: string;
    Avatar: string;
    [key: string]: string | number;
}

const UsersComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // Use the User interface here
    const [displayCount, setDisplayCount] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data: User[] = await response.json(); // Use the User interface here
                const usersWithAvatars = await Promise.all(data.map(async (user: User) => { // Use the User interface here
                    const randomNumber = Math.floor(Math.random() * 500) + 1;
                    const avatarUrl = `https://i.pravatar.cc/${randomNumber}`;
                    return {...user, Avatar: avatarUrl};
                }));
                setUsers(usersWithAvatars);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const loadMore = () => {
        setDisplayCount(prevCount => prevCount + 10);
    };

    return (
        <div className="border-2 m-10 p-5 rounded-2xl bg-gray-800 text-white">
            <Table aria-label="Users table"
                   color='secondary'>
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users.slice(0, displayCount)}>
                    {(user: User) => { // Use the User interface here
                        const randomNumber = Math.floor(Math.random() * 500) + 1;
                        return (
                            <TableRow key={user.ID}>
                                {columnKey => <TableCell>
                                    {columnKey === "Image_URL"
                                        ? (<img src={`https://i.pravatar.cc/${randomNumber}`} className="rounded-3xl"
                                                alt="avatar" width="50"/>)
                                        : (user[columnKey])
                                    }
                                </TableCell>}
                            </TableRow>
                    );
                    }}
                </TableBody>
            </Table>
                        <div className="flex items-center justify-center">
            <button onClick={loadMore} className="m-3 p-3 columns-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Load More
            </button>
            </div>
        </div>
);
};

export default UsersComponent;
