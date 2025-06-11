import React, { useState } from "react";

const UserList = ({ users, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by name or email
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Start a Chat
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <ul className="space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isRegularUser = user.role === "user";
            const roleLabel = user.role?.charAt(0).toUpperCase() + user.role?.slice(1);

            return (
              <li key={user._id}>
                <button
                  onClick={() => onSelect(user)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg shadow transition duration-200 bg-white hover:bg-blue-50"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${
                      isRegularUser ? "bg-blue-800" : "bg-blue-600"
                    } text-white flex items-center justify-center font-bold text-lg`}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left flex-grow">
                    <div className="text-md font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>

                  <span
                    className={`text-xs font-semibold uppercase rounded-full px-2 py-1 ${
                      isRegularUser
                        ? "bg-blue-200 text-blue-900"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {roleLabel}
                  </span>
                </button>
              </li>
            );
          })
        ) : (
          <li className="text-center text-gray-500">No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
