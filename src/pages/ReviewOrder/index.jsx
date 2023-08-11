import Header from "@/components/Header";
import { RootContainer } from "../pages.styles";
import { Button, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RatingsSchema } from "@/schemas/ratings";
import ReviewComponent from "./components/ReviewComponent";

export default function ReviewOrder() {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(RatingsSchema),
        defaultValues: {
            restaurantReview: {
                rating: 5,
                review: "",
                highlights: []
            },
            foodReviews: [
                {
                    rating: 5,
                    review: "",
                    highlights: []
                },
                {
                    rating: 4.5,
                    review: "",
                    highlights: []
                }
            ]
        }
    })
    const { fields } = useFieldArray({ name: "foodReviews", control })

    const submitReview = async data => {
        console.log(data)
    }

    return (
        <RootContainer bgcolor="lightGray !important" px={10} pb={10}>
            <Header
                renderMain={<Typography variant="heading5Medium">Rate & Review</Typography>}
            />
            <ReviewComponent
                name="restaurantReview"
                control={control}
                entityName="Review the Nandi Hills"
                options={["Good service", "Good Ambience", "Overpriced"]}
            />
            <Typography color="#363636" variant="heading5Bold" mb={8}>Review Food ({fields.length})</Typography>
            {fields.map((field, index) => (
                <ReviewComponent
                    key={field.id}
                    name={`foodReviews.${index}`}
                    control={control}
                    entityName="Veg Biryani"
                    options={["Good service", "Good Ambience", "Overpriced"]}
                />
            ))}
            <Button fullWidth variant="contained" onClick={handleSubmit(submitReview)}>Submit</Button>
        </RootContainer>
    )
}