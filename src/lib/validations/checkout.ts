import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name is too long"),
  whatsapp: z
    .string()
    .min(7, "Please enter a valid WhatsApp or phone number (min 7 digits)")
    .regex(/^[\d\s+\-().]+$/, "Please enter a valid phone number with country code"),
  areaId: z.string().min(1, "Please select your Bali delivery area"),
  durationWeeks: z
    .number()
    .min(1, "Minimum rental duration is 1 week")
    .max(24, "Maximum online booking is 24 weeks"),
  villaAddress: z
    .string()
    .min(5, "Please specify your Bali villa, hotel, or street address")
    .max(300, "Address is too long"),
  specialRequests: z.string().max(250).optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
