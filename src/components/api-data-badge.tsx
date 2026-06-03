import { Badge } from "@/components/ui/badge";

export function ApiDataBadge({ fromApi, label }: { fromApi: boolean; label?: string }) {
  return (
    <Badge variant={fromApi ? "default" : "secondary"} className="text-xs">
      {fromApi ? `Live API${label ? `: ${label}` : ""}` : "Mock data"}
    </Badge>
  );
}
