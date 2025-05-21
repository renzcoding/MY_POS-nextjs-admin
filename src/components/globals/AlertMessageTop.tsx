import { AlertProps } from "@/types/AlertType";
import Alert from "../ui/alert/Alert";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface AlertMessageTopProps {
  alert: AlertProps;
}

const icons: any = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  error: <AlertCircle className="h-5 w-5 text-red-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
};

const bgColor: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
};
export default function AlertMessageTop({ alert }: AlertMessageTopProps) {
  return (
    <>
      <div
        className={`flex items-start gap-2 rounded-md p-4 ${bgColor[alert.type]}`}
      >
        <Alert
          variant={alert.type}
          title={alert.title}
          message={alert.message}
          showLink={false}
        />
      </div>
    </>
  );
}
