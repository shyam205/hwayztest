import { object, string, array, number } from 'yup'

export const RatingsSchema = object().shape({
    restaurantReview: object().shape({
        rating: number(),
        review: string(),
        highlights: array().of(string()),
    }),
    foodReviews: array().of(object().shape({
        rating: number(),
        review: string(),
        highlights: array().of(string())
    }))
})