"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { FiUser, FiMail, FiCalendar, FiLock, FiEye, FiEyeOff, FiCheck, FiLoader, FiX, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

function Field({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fcfaf7] border border-[#eae6df]">
      <div className="w-9 h-9 rounded-lg bg-white border border-[#e5e0d8] flex items-center justify-center shrink-0 shadow-sm">
        <Icon size={16} className="text-[#873d3d]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5 break-all">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);
      setLoading(false);
    };
    load();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (newPassword.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }

    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwSaving(false);

    if (error) {
      setPwError(error.message);
    } else {
      setPwSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSuccess(false), 4000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center">
        <FiLoader className="animate-spin text-[#873d3d]" size={24} />
      </div>
    );
  }

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 border-b border-[#eae6df] pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">Admin Profile</h1>
            <p className="text-gray-500 mt-1 text-sm font-light">Your account information & security settings.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 border border-[#eae6df] px-3 py-2 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
          >
            <FiLogOut size={14} /> Log Out
          </button>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-5 mb-8 p-5 bg-white rounded-2xl border border-[#eae6df] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#873d3d] to-[#a85050] flex items-center justify-center shadow-md shrink-0">
            <span className="text-2xl font-bold text-white font-serif">
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800 font-serif">Administrator</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#873d3d]/10 text-[#873d3d] border border-[#873d3d]/20">
              Supabase Auth
            </span>
          </div>
        </div>

        {/* Account Info */}
        <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Information</h2>
          <div className="space-y-3">
            <Field icon={FiUser} label="Role" value="Administrator" />
            <Field icon={FiMail} label="Email Address" value={user?.email ?? "—"} />
            <Field icon={FiCalendar} label="Account Created" value={createdAt} />
            <Field icon={FiLock} label="Authentication" value="Email / Password" />
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-white border border-[#eae6df] rounded-2xl p-6 shadow-sm">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Change Password</h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.form?.requestSubmit(); }}
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-[#e5e0d8] bg-[#fcfaf7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#873d3d]/40 focus:border-[#873d3d] transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Strength hint */}
            {newPassword.length > 0 && (
              <div className="flex gap-1.5">
                {[3, 6, 10, 14].map((threshold) => (
                  <div
                    key={threshold}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      newPassword.length >= threshold
                        ? newPassword.length >= 12 ? "bg-green-500" : "bg-[#873d3d]"
                        : "bg-[#eae6df]"
                    }`}
                  />
                ))}
                <span className="text-[10px] text-gray-400 ml-1 self-center">
                  {newPassword.length < 6 ? "Weak" : newPassword.length < 10 ? "Fair" : newPassword.length < 14 ? "Good" : "Strong"}
                </span>
              </div>
            )}

            {/* Feedback */}
            {pwError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
                <FiX size={15} /> {pwError}
              </div>
            )}
            {pwSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-4 py-2.5 rounded-lg">
                <FiCheck size={15} /> Password updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={pwSaving || !newPassword || !confirmPassword}
              className="w-full py-3 bg-[#873d3d] hover:bg-[#722f2f] text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-1"
            >
              {pwSaving ? <><FiLoader className="animate-spin" size={15} /> Updating Password…</> : "Update Password"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
