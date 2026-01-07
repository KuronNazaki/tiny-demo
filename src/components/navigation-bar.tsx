import { useNavigation } from "@pars/providers/use-navigation";
import { Button } from "@pars/shared/components/ui/button";
import { ChartPie, CreditCard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAVIGATION_ITEMS = [
  { name: "dashboard", label: "Dashboard", icon: ChartPie, href: "/" },
  {
    name: "subscriptions",
    label: "Subscriptions",
    icon: CreditCard,
    href: "/subscriptions",
  },
  {
    name: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const NavigationItem = ({
  name,
  icon: Icon,
  label,
  href,
}: (typeof NAVIGATION_ITEMS)[number]) => {
  const navigate = useNavigate();

  const { current, setCurrent } = useNavigation();

  const isCurrentNavigation = current === name;

  const onNavigate = () => {
    setCurrent(name);
    navigate(href);
  };

  return (
    <Button asChild withChildrenStyle onClick={onNavigate}>
      <div className="flex flex-col justify-center items-center gap-1">
        <Icon strokeWidth={isCurrentNavigation ? 3 : undefined} />
        <span className={`text-xs ${isCurrentNavigation && "font-semibold"}`}>
          {label}
        </span>
      </div>
    </Button>
  );
};

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 border-t flex justify-between items-center gap-2 px-10 bg-background">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.name} {...item} />
      ))}
    </nav>
  );
};

export default NavigationBar;
