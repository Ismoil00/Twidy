import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DropDownMenuCompProps } from "./types";

export default function DropDownMenu({
  button,
  elements,
}: DropDownMenuCompProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span onClick={handleClick}>{button}</span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {elements.map((el) => (
          <MenuItem key={el} onClick={handleClose} className="">
            {el}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
