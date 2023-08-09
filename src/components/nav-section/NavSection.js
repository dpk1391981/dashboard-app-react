import PropTypes from "prop-types";
import { Link, NavLink as RouterLink } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { Box, List, ListItemText, Collapse, Button } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import SvgColor from "../svg-color";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import "./nav.css";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

const NavSection = ({ data = [], dashboard, dashboard_detail, ...other }) => {
  const params = useLocation();
  const activeURL = params["pathname"].split("/")[2];
  const defaultOpenURL = ["create", "view", "edit"].includes(activeURL) ? true : false;
  console.log(`defaultOpenURL`);
  console.log(defaultOpenURL);
  const [open, setOpen] = useState(defaultOpenURL);
  const handleClick = (menu) => {
    setOpen(!menu ? false : !open);
  };

  const DashboardChild =
    dashboard && Array.isArray(dashboard)
      ? dashboard.map((d) => {
          return {
            id: d["_id"],
            title: d["title"],
            path: "/dashboard/view/" + d["_id"],
            activeClass: d["_id"],
          };
        })
      : [];

  const MapData = data.map((d) => {
    return {
      ...d,
      subMenu: d["title"] === "dashboard" ? DashboardChild : null,
    };
  });

  console.log(`MapData`);
  console.log(MapData);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {MapData.map((item, index) => (
          <>
            <div style={{ display: "flex" }}>
              <NavItem
                key={item.title}
                item={item}
                open={open}
                submenu={item.subMenu || false}
                handleClick={handleClick}
              />
              {item.subMenu && (
                <Link
                  style={{ margin: "15px", cursor: "pointer" }}
                  to={"/dashboard/create"}
                  onClick={() => setOpen(true)}>
                  <SvgColor src={`/assets/icons/navbar/addIcon.svg`} sx={{ width: 18, height: 18 }} />
                </Link>
              )}
            </div>
            {item.subMenu && (
              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.subMenu.map((child, index) => (
                    <>
                      <NavItem key={child.title} item={child} />
                      {index === item.subMenu.length - 1 && (
                        <Divider sx={{ borderStyle: "groove", background: "#000", margin: "12px 0px 0px 0px" }} />
                      )}
                    </>
                  ))}
                </List>
              </Collapse>
            )}
          </>
        ))}
      </List>
    </Box>
  );
};

NavSection.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  dashboard: state.dashboard.dashboard,
  dashboard_detail: state.dashboard.dashboard_detail,
});

export default connect(mapStateToProps, {})(NavSection);

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, open, submenu, handleClick }) {
  const { title, path, icon, activeClass, info, subMenu } = item;
  const params = useLocation();
  const activeCl = params["pathname"].includes(activeClass) ? true : false;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      className={activeCl ? "active" : ""}
      sx={{
        "&.active": {
          color: "white",
          bgcolor: "#FF4D42",
          fontWeight: "fontWeightBold",
        },
        width: "70%",
      }}
      onClick={() => handleClick(subMenu)}>
      <StyledNavItemIcon>{icon}</StyledNavItemIcon>

      <ListItemText
        // disableTypog raphy
        primary={<span className='nav-word-wrap'>{title}</span>}
      />
      <>
        {submenu && submenu.length ? (
          <>
            {open
              ? submenu && <ExpandLess style={{ margin: "0px 15px 3px 0px" }} />
              : submenu && <ExpandMore style={{ margin: "0px 15px 3px 0px" }} />}
          </>
        ) : (
          ""
        )}
      </>

      {info && info}
    </StyledNavItem>
  );
}
