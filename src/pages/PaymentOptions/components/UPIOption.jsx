import images from "@/utilities/images";
import { Typography, styled, useRadioGroup, Radio, Box } from "@mui/material";

const Root = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: `${theme.spacing(8)} ${theme.spacing(10)}`,
    borderBottom: "0.5px solid #7B7B7B"
}))

const UPIIcon = styled("img")`
    object-fit: contain;
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

export default function UPIOption({ option }) {
    const { value } = useRadioGroup() ?? {}
    const checked = value === option

    return (
        <Root value={option}>
            <UPIIcon src={images.GOOGLE_PAY_ICON} alt="UPI option" />
            <Typography flex="1" textAlign="left" variant="paragraphMedium">{option}</Typography>
            <Radio value={option} checked={checked} />
        </Root>
    )
}