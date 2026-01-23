import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    getUsers();
  }, [role]);

  async function getUsers() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/users?role=${role}`);
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function toggleBlock(userId, isBlocked) {
    try {
      setActionId(userId);
      await instance.put(`/admin/user/block/${userId}`, {
        blocked: !isBlocked,
      });

      setUsers(prev =>
        prev.map(u =>
          u._id === userId ? { ...u, blocked: !isBlocked } : u
        )
      );

      toast.success(isBlocked ? "User unblocked" : "User blocked");
    } catch {
      toast.error("Action failed");
    } finally {
      setActionId(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="text-3xl animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6"
      style={{
        background:
          "linear-gradient(135deg,#f8fafc,#eef2ff,#f1f5f9)",
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <FaArrowLeft /> Back
        </button>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full sm:w-auto"
        >
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3 break-all">{u.email}</td>

                  <td className="p-3 text-center">
                    {u.blocked ? (
                      <span className="text-red-600 font-medium">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-medium">Active</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {role === "user" && (
                      <button
                        onClick={() => toggleBlock(u._id, u.blocked)}
                        className={`px-3 py-1 rounded-lg text-white text-xs
                        ${
                          u.blocked
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {actionId === u._id ? "..." : u.blocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
