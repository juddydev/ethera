import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { IUser } from "../../http";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

interface UsersTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IUser
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof IUser | "actions";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "appId",
    numeric: false,
    disablePadding: true,
    label: "App Id",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "tags",
    numeric: true,
    disablePadding: false,
    label: "User Tags",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];
export function UsersTableHead(props: UsersTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof IUser | "actions") =>
    (event: React.MouseEvent<unknown>) => {
      if (property === "actions") {
        return;
      }
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
