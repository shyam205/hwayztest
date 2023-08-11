import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { styled } from "@mui/material";
import Input from '@mui/base/Input'

const StyledInput = styled(Input)(({ theme }) => ({
    border: `1px solid ${theme.palette.lightGray.main}`,
    borderRadius: "8px",
    padding: `${theme.spacing(5)} ${theme.spacing(8)}`,
    display: "flex",
    alignItems: "center",
    marginTop:  theme.spacing(14),
    marginBottom: theme.spacing(10),
    "& > input": {
        outline: "none",
        border: "none",
        flex: 1,
        fontFamily: "Poppins",
        marginLeft: theme.spacing(2)
    }
}))

export default function SearchQuestion({ value, handleChange }) {

    return (
        <StyledInput
            startAdornment={<SearchOutlinedIcon />}   
            value={value}
            onChange={handleChange}
            placeholder="Search a question"
        />
    )
}