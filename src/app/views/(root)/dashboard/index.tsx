import { redirect } from "next/navigation";

export default function DashboardViews({ user, session }: any) {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name || session.user?.email}!</p>
    </div>
  );
}
