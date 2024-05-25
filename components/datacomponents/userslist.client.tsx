"use client";
import React from 'react';

class UsersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        fetch('/api/users')
            .then(response => response.json())
            .then(usersFromApi => this.setState({ users: usersFromApi }));
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                {users.map((user) => (
                    <div key={user.uid}>
                        <h2>{user.FirstName} {user.LastName}</h2>
                        <p>{user.Email}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default UsersComponent;