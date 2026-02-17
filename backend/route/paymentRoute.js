import express from 'express'
// import { createStripePayment, verifyStripePayment } from '../controller/orderController.js'
const paymentRouter = express.Router()
import { RazorpayOrder, verifyPayment } from '../controller/orderController.js'


// paymentRouter.post('/stripe-order',createStripePayment)
// paymentRouter.post('/verifypayment',verifyStripePayment)

paymentRouter.post("/razorpay-order",RazorpayOrder)
paymentRouter.post("/verifypayment",verifyPayment)

export default paymentRouter