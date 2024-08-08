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
    name: "Add bundle Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook",
  },
  {
    id: 5,
    name: "Add Quiz",
    path: "/dashboard/add-quiz",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 6,
    name: "My Quiz",
    path: "/dashboard/my-quiz",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 7,
    name: "Study Materials",
    path: "/dashboard/studymaterials",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 7,
    name: "Add Cource Video",
    path: "/dashboard/course-video",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
 
];
