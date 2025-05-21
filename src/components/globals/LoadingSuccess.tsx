import { CheckCircle2 } from "lucide-react";

export default function LoadingSuccess() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-6">
      <CheckCircle2 className="h-10 w-10 text-green-500" />
      <p className="font-semibold text-green-600">Success!</p>
    </div>
  );
}
