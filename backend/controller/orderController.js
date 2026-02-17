// import Stripe from "stripe"
// import dotenv from "dotenv"
// import Course from "../model/courseModel.js"
// import User from "../model/userModel.js"

// dotenv.config()

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// // CREATE PAYMENT (instead of RazorpayOrder)
// export const createStripePayment = async (req, res) => {
//   try {
//     const { courseId } = req.body

//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" })
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(course.price * 100), // in paise
//       currency: "inr",
//      automatic_payment_methods: { enabled: true },
//     // return_url: "http://localhost:5173/payment-success",
//       metadata: { courseId }
//     })

//     return res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//       price:course?.price * 100,
//       id: paymentIntent.id, 
//     })

//   } catch (error) {
//     return res.status(500).json({
//       message: `Failed to create Stripe Payment ${error.message}`
//     })
//   }
// }

// // VERIFY PAYMENT (instead of verifyPayment)
// export const verifyStripePayment = async (req, res) => {
//   try {
//     const { courseId, userId, paymentIntentId } = req.body

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

//     if (paymentIntent.status === "succeeded") {

//       const user = await User.findById(userId)
//       if (!user.enrolledCourses.includes(courseId)) {
//         user.enrolledCourses.push(courseId)
//         await user.save()
//       }

//       const course = await Course.findById(courseId).populate("lectures")
//       if (!course.enrolledStudents.includes(userId)) {
//         course.enrolledStudents.push(userId)
//         await course.save()
//       }

//       return res.status(200).json({
//         message: "Payment verified and enrolled successfully"
//       })

//     } else {
//       return res.status(400).json({ message: "Payment not successful" })
//     }

//   } catch (error) {
//     return res.status(500).json({
//       message: `Internal error during payment verification ${error.message}`
//     })
//   }
// }




import razorpay from 'razorpay'
import dotenv from "dotenv"
import Course from '../model/courseModel.js'
import User from '../model/userModel.js'

dotenv.config()

const RazorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const RazorpayOrder = async(req,res)=>{
    try {
        const {courseId} = req.body
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course is not found"})
        }
        const optios={
            amount:course.price*100,
            currency:'INR',
            receipt:`${courseId}`.toString()
        }
        const order = await RazorPayInstance.orders.create(optios)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({message:`failed to creat Razorpay Order ${error}`})
    }
}


export const verifyPayment = async(req,res)=>{
    try {
        const {courseId, userId, razorpay_order_id} = req.body
        const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const user = await User.findById(userId)
            if(!user.enrolledCourses.includes(courseId)){
               await user.enrolledCourses.push(courseId)
               await user.save()
            }
            const course = await Course.findById(courseId).populate("lectures")
            if(!course.enrolledStudents.includes(userId)){
                await course.enrolledStudents.push(userId)
                await course.save()
            }
            return res.status(200).json({message:"payment verified and enrolled successful"})
        }else{
            return res.status(400).json({message:"payment failed"})
        }
    } catch (error) {
        return res.status(500).json({message:`Internal error during payment verification ${error}`})
    }

}

