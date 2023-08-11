export function getTotalPayment(total) {
    const gst = 0.05 * total
    const platformFees = 10
    return {
        gst,
        platformFees,
        totalToPay: total+gst+platformFees
    }
}