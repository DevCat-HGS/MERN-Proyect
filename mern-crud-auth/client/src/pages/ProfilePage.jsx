import { useAuth } from "../context/authContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center p-10">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold text-white mb-5">Profile</h1>
        <div className="space-y-4">
          <div>
            <p className="text-slate-300">Username:</p>
            <p className="text-white font-bold">{user.username}</p>
          </div>
          <div>
            <p className="text-slate-300">Email:</p>
            <p className="text-white font-bold">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 