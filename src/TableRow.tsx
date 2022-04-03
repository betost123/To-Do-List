import { Checkbox, IconButton } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableRow: React.FC<{
  selected: boolean;
  onClickUpdateStatus: any;
  title: string;
  onClickDeleteTask: any;
}> = ({ selected, onClickUpdateStatus, title, onClickDeleteTask }) => {
  return (
    <div
      style={{
        backgroundColor: "#EAEDFB",
        padding: 8,
        borderRadius: 4,
        margin: 4,
        width: "70%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Checkbox onClick={onClickUpdateStatus} checked={selected} />
          {title}
        </div>
        <IconButton onClick={onClickDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
