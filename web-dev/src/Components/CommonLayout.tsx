import { Box } from "@mui/material";

export function CommonLayout(props: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element {
  return <Box className="CommonLayout">{props.children}</Box>;
}
