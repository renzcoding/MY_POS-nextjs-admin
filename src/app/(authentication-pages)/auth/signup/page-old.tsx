import RegisterViews from "@/app/views/(auth)/register";
import SignUpViews from "@/app/views/(auth)/signup";

export default function Signup() {
  return (
    <div className="container mx-auto">
      <h1>This is Sign Up Page</h1>
      <SignUpViews />
    </div>
  );
}
