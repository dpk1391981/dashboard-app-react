// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("dashboard"),
    buttonIcon: <SvgColor src={`/assets/icons/navbar/vector.svg`} sx={{ width: 10, height: 15 }} />,
    activeClass: "create",
    subMenu: [],
  },

  {
    title: "user",
    path: "/dashboard/user",
    activeClass: "user",
    icon: icon("group-278"),
  },

  {
    title: "integration",
    path: "/dashboard/integration",
    activeClass: "integration",
    icon: icon("group-279"),
  },

  // {
  //   title: "setting",
  //   path: "/dashboard/setting",
  //   activeClass: "setting",
  //   icon: icon("group1"),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
