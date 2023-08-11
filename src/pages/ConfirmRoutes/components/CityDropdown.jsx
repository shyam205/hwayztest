import { useState } from "react"
import { MenuItem, Typography, styled } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"

const StyledButton = styled(Button)`
    & .MuiButton-endIcon {
        position: static;
    }
`

const MenuButton = styled(MenuItem)`
    min-width: 200px;
`

export default function CityDropdown({ list, selected, setSelected }) {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    const handleClick = e => {
        setAnchor(e.currentTarget)
    }

    const handleClose = city => {
        if (typeof city === "string") {
            setSelected(city)
        }
        setAnchor(null)
    }
    
    return (
        <>
            <StyledButton onClick={handleClick} variant="text" endIcon={<KeyboardArrowDownIcon fontSize="small" />}>
                <Typography variant="h2">{selected}</Typography>
            </StyledButton>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
            >
                {list.map(city => <MenuButton onClick={() => handleClose(city)} key={city} selected={selected === city}>{city}</MenuButton>)}
            </Menu>
        </>
    )
}