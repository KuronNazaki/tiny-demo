import { RotateCw } from "lucide-react";
import { usePullToRefresh } from "use-pull-to-refresh";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;

const handleRefresh = () => {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};

const RefreshingPull = () => {
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: handleRefresh,
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  return (
    <div
      style={{
        top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
        opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
      }}
      className="bg-background text-foreground border fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
    >
      <div
        className={`h-full w-full flex justify-center items-center ${
          isRefreshing ? "animate-spin" : ""
        }`}
        style={!isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}}
      >
        <RotateCw />
      </div>
    </div>
  );
};

export default RefreshingPull;
