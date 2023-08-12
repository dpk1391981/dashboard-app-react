import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { resetDashboard } from "../actions/dashboard";
import { AllUserList } from "../actions/user";
import UserListHead from "../sections/@dashboard/user/UserListHead";
import UserListToolbar from "../sections/@dashboard/user/UserListToolbar";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email Address", alignRight: false },
  { id: "mobileNumber", label: "Phone No.", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "action", label: "Action", alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const UserPage = ({ userList, user_detail, resetDashboard, AllUserList }) => {
  const users = user_detail["isSuperAdmin"] ? userList || [] : [user_detail];

  useEffect(() => {
    resetDashboard();
    AllUserList();
  }, []);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  console.log(`userListuserListuserListuserList`);
  console.log(users);

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Dashboard App </title>
      </Helmet>

      <Grid mb={5}>
        <Typography variant='h4' gutterBottom>
          Manage User Accounts
        </Typography>
        <Button variant='contained' style={{ background: "#FF4D42" }}>
          All User
        </Button>
      </Grid>

      <Card>
        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { _id, fullName, status, mobileNumber, avatar, email_verified, email, role, isSuperAdmin } =
                    row;
                  const selectedUser = selected.indexOf(fullName) !== -1;

                  return (
                    <TableRow hover key={_id} tabIndex={-1} role='checkbox' selected={selectedUser}>
                      <TableCell padding='1'>
                        {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} /> */}
                      </TableCell>

                      <TableCell component='th' scope='row' padding='none'>
                        <Stack direction='row' alignItems='center' spacing={2}>
                          <Avatar alt={fullName} src={avatar} />
                          <Typography variant='subtitle2' noWrap>
                            {fullName}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align='left'>{email}</TableCell>

                      <TableCell align='left'>{mobileNumber || "--"}</TableCell>

                      <TableCell align='left'>
                        {email_verified ? (
                          <Iconify style={{ color: "green" }} icon={"ic:baseline-verified"} />
                        ) : (
                          <Iconify style={{ color: "yellow" }} icon={"mdi:account-pending"} />
                        )}
                      </TableCell>

                      <TableCell align='left'>
                        <Label color={(status === "banned" && "error") || "success"}>{sentenceCase(status)}</Label>
                      </TableCell>

                      <TableCell align='left'>
                        <Label color={"success"}>{isSuperAdmin ? "SUPER ADMIN" : role}</Label>
                      </TableCell>

                      <TableCell align='right'>
                        <IconButton size='large' color='inherit' onClick={handleOpenMenu} sx={{ color: "green" }}>
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}>
                        <Typography variant='h6' paragraph>
                          Not found
                        </Typography>

                        <Typography variant='body2'>
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}>
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_detail: state.auth.user,
  userList: state.user.userList,
  loadUser: state.user.loading,
});

export default connect(mapStateToProps, { resetDashboard, AllUserList })(UserPage);
