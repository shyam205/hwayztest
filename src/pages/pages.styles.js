import { Box, styled } from "@mui/material";

export const RootContainer = styled(Box)`
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.palette.background.main};
`