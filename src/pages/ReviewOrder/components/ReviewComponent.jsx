import { Box, Rating, Typography, Chip, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";
import images from "@/utilities/images";

const EntityImage = styled("img")`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
`

const ReviewField = styled(TextareaAutosize)(({ theme }) => ({
    background: "#F6F6F6",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
    border: "1px solid #DDD",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "Poppins",
    margin: `${theme.spacing(4)} 0`
}))

export default function ReviewComponent({ name, control, entityName, options }) {
    
    const handleChipClick = (onChange, value, option) => onChange(value.includes(option)? value.filter(el => el !== option): value.concat(option))

    return (
        <Box bgcolor="white" borderRadius={2} p={8} mb={15}>
            <Box
                display="flex"
                alignItems="center"
            >
                <EntityImage src={images.STORE_IMAGE} alt="Store" />
                <Typography>{entityName}</Typography>
            </Box>
            <Controller
                name={`${name}.rating`}
                control={control}
                render={({ field }) => 
                <Rating
                    {...field}
                    onChange={e => field.onChange(+e.target.value)}
                    max={5}
                    precision={0.5}
                    size="large"
                    sx={{ my: 3, ml: "40px" }}
                />}
            />
            <Controller
                name={`${name}.review`}
                control={control}
                render={({ field }) => 
                <ReviewField
                    {...field}
                    minRows={3}
                    placeholder="Write a review"
                />}
            />
            <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                columnGap="10px"
                rowGap="10px"
            >
                <Controller
                    name={`${name}.highlights`}
                    control={control}
                    render={({ field: { value, onChange } }) => options?.map(option => 
                        <Chip
                            key={option}
                            variant={value?.includes(option)? "filled": "outlined"}
                            label={option}
                            onClick={() => handleChipClick(onChange, value, option)}
                        />)
                    }
                />
            </Box>
        </Box>
    )
}