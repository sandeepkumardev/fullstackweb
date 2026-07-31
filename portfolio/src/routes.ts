import { Clock as ClockIcon, HomeIcon, ListTodo, Timer, UserLock, UserPlus } from "lucide-react";
import Home from "./apps/Home";
import StopWatch from "./apps/StopWatch";
import Clock from "./apps/Clock";
import Todo from "./apps/Todo";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

interface IRoute {
  title: string;
  path: string;
  icon: any;
  element: any;
}

export const appRoutes: IRoute[] = [
  {
    title: "Home",
    path: "/",
    icon: HomeIcon,
    element: Home,
  },
  {
    title: "Stopwatch",
    path: "/stopwatch",
    icon: Timer,
    element: StopWatch,
  },
  {
    title: "Clock",
    path: "/clock",
    icon: ClockIcon,
    element: Clock,
  },
  {
    title: "Todo",
    path: "/todo",
    icon: ListTodo,
    element: Todo,
  },
];

export const authRoutes = [
  {
    title: "SignIn",
    path: "/signin",
    icon: UserLock,
    element: SignIn,
  },
  {
    title: "SignUp",
    path: "/signup",
    icon: UserPlus,
    element: SignUp,
  },
];
