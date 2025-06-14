import { z } from "zod";

export const notificationSchema = z.object({
  welcomeMessage: z
    .string()
    .min(10, "Welcome message must be at least 10 characters")
    .default(
      "Dear [Name],Thank you for your order [ID] from [Store Name], For any support, contact us at [Support Contact], Thank you for shopping with us! 😊"
    ),

  trackingMessage: z
    .string()
    .min(15, "Tracking message must be at least 15 characters")
    .default(
      "We appreciate your trust and will process your order soon, Track your order anytime [Tracking], For any support, contact us at [Support Contact]. 😊"
    ),

  orderUpdateMessage: z
    .string()
    .min(10, "Order update message must be at least 10 characters")
    .default(
      "Your order [ID] is being prepared! 🛍️, We will notify you once it's out for delivery! 🚀, Track your order anytime [Tracking] 😊"
    ),

  deliveryConfirmation: z
    .string()
    .min(15, "Delivery confirmation must be at least 15 characters")
    .default(
      "Your order [ID] has been delivered successfully! 🎁, We hope you love your purchase! ❤️Let us know your feedback [Support Contact], Thank you for choosing [Store Name]! 😊"
    ),

  feedbackMessage: z
    .string()
    .min(20, "Feedback message must be at least 20 characters")
    .default(
      "We hope you’re loving your order [ID] from [Store Name]! 😍, Would you take a moment to share your experience? ⭐⭐⭐⭐⭐, Leave a review here [Feedback Link]. 😊"
    ),

  abandonedCartReminder: z
    .string()
    .min(20, "Cart reminder must be at least 20 characters")
    .default(
      "We noticed you left some amazing items in your cart at [Store Name]! 🛍️, Your cart is waiting for you! Complete your purchase before it’s gone. 😊"
    ),

  vipOffers: z
    .string()
    .min(15, "VIP offer message must be at least 15 characters")
    .default(
      "Hello [Name], As one of our VIP customers, we have an exclusive deal just for you! 🎉,  Shop now: [Store URL] 🛍️, Thank you for being a loyal customer! ❤️"
    ),

  storeClosureNotice: z
    .string()
    .min(20, "Store closure notice must be at least 20 characters")
    .default(
      "Dear [Name], We’d like to inform you that [Store Name] will be closed for some days, For urgent queries, contact us at [Support Contact], Thank you for your patience! We’ll be back soon. 😊"
    ),

  backInStockAlert: z
    .string()
    .min(15, "Back in stock alert must be at least 15 characters")
    .default(
      " Hey [Name], Good news! 🎉 The item you wanted is back in stock at [Store Name]! Need assistance? Chat with us at [Support Contact], Happy shopping! 😊"
    ),

  preOrderUpdates: z
    .string()
    .min(20, "Pre-order update must be at least 20 characters")
    .default(
      "Hello [Name], Your pre-order is confirmed! 🚀, For any updates, contact us at [Support Contact], Thank you for choosing [Store Name]! 😊"
    ),

  orderCancellation: z
    .string()
    .min(20, "Cancellation message must be at least 20 characters")
    .default(
      "Dear [Name], Your order [Id] has been cancelled due to some reasons, Refund will be processed shortly, For any updates, contact us at [Support Contact]. 😊"
    ),

  refundUpdate: z
    .string()
    .min(15, "Refund update must be at least 15 characters")
    .default(
      "Dear [Name], Your refund request for order [ID] has been received, We will notify you once it’s processed. For questions, reach out to [Support Contact].Thank you for your patience! 😊"
    ),

    loyaltyRewards: z
    .string()
    .min(20, "Loyalty rewards message must be at least 20 characters")
    .default(
      "Dear [Name], you've earned loyalty points! 🎉,  Keep shopping at [Store_Name] to earn more rewards!, Thank you for shopping with us! 😊. 🛍️"
    ),
  
  flashSaleAlert: z
    .string()
    .min(20, "Flash sale alert must be at least 20 characters")
    .default(
      "🚨 Flash Sale Alert! Get discount for the next hours hours only at [Store_Name]! 🛒 Hurry, shop now [Store URL] before the deal ends! ⏳"
    ),
  
  birthdayOffer: z
    .string()
    .min(20, "Birthday offer must be at least 20 characters")
    .default(
      "🎉 Happy Birthday [Name]! 🥳 As a special gift, enjoy discount on your next purchase at [Store_Name]!, Shop now from here [Store URL] 🎁"
    ),
  
  subscriptionRenewal: z
    .string()
    .min(20, "Subscription reminder must be at least 20 characters")
    .default(
      "Hello [Name], your subscription with [Store_Name] is renewing. Need to update your plan? enjoy discount on your next purchase at [Store_Name]!, 📅"
    ),
  
  productRecommendations: z
    .string()
    .min(20, "Recommendations message must be at least 20 characters")
    .default(
      "Based on your past purchases, we’ve picked some amazing products for you! 🛍️ Check them out now at [Store_Name]! 😊"
    ),
  
  supportFollowup: z
    .string()
    .min(20, "Support follow-up must be at least 20 characters")
    .default(
      "Hi [Name], we hope your issue with ticket was resolved! How satisfied are you with our support?  For any support, contact us at [Support Contact]. 😊"
    ),
  
  invoiceNotification: z
    .string()
    .min(15, "Invoice notification must be at least 15 characters")
    .default(
      "Your invoice for order [ID] from [Store_Name] is ready! 🧾 Thank you for your order [ID] from [Store Name], Thank you for shopping with us! 😊"
    ),
  
  wishlistReminder: z
    .string()
    .min(20, "Wishlist reminder must be at least 20 characters")
    .default(
      "Dear [Name], the items in your wishlist at [Store_Name] are waiting for you!, For any support, contact us at [Support Contact]. 😊"
    ),
});

export type NotificationFormData = z.infer<typeof notificationSchema>;