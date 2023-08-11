import { styled } from "@mui/material";
import Input from '@mui/base/Input'
import { forwardRef } from "react";

const StyledInput = styled(Input)(({ theme }) => ({
    border: `1px solid ${theme.palette.lightGray.main}`,
    borderRadius: "8px",
    padding: `${theme.spacing(5)} ${theme.spacing(8)}`,
    display: "flex",
    alignItems: "center",
    "& > input": {
        outline: "none",
        border: "none",
        flex: 1,
        fontFamily: "Poppins",
        background: "transparent",
        marginLeft: theme.spacing(2),
        "&::placeholder": {
            color: "#959595"
        }
    },
}))

export default forwardRef(function CustomInput({ inputProps, ...props }, ref) {
    return (
        <StyledInput
            slotProps={{
                input: {
                    ...inputProps,
                    ref
                }
            }} 
            {...props}
        />
    )
})