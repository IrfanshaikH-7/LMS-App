import { ACCOUNT_TYPE } from '../src/utils/constants';

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 2,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAccount",
  },
 
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
 
];
