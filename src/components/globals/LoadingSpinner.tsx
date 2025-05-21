import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-6">
      <Loader2 className="text-primary h-10 w-10 animate-spin" />
    </div>
  );
}
