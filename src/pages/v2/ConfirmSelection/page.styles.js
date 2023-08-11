import Box from '@mui/material/Box'
import { styled } from '@mui/material'

export const SectionBox = styled(Box)`
    border-radius: 12px;
    box-shadow: 0px 15px 25px 0px #0000000D;
    background: white;
    & > * {
        padding: ${({ theme }) => `${theme.spacing(9)} ${theme.spacing(12)}`};
    }
`