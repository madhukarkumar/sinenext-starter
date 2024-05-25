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
const UsersComponent: React.FC = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                const usersWithAvatars = await Promise.all(data.map(async user => {
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

    return (
        <div className="border-2 m-4 p-6 rounded-2xl bg-gray-800 text-white">
            <Table aria-label="Users table"
                   color='secondary'>
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {user => {
                        const randomNumber = Math.floor(Math.random() * 500) + 1; // Generate a new random number for each user
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
        </div>
    );
};

export default UsersComponent;
