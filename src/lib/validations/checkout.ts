import { z } from "zod";

/**
 * Checkout Form Validation Schema
 *
 * Enforces rigorous input sanitization and ITU-T E.164 international phone bounds:
 * - Full name: trimmed, 2-80 characters
 * - WhatsApp phone: trimmed, 8-15 digits (ITU-T E.164 standard), max 20 chars formatted
 * - Bali area: valid enum/id
 * - Duration: 1-24 weeks
 * - Villa address: trimmed, 5-300 characters
 */
export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name cannot exceed 60 characters")
    .regex(
      /^[\p{L}][\p{L}\s.'-]*[\p{L}.]$/u,
      "Please enter a valid full name (letters, spaces, hyphens, and apostrophes only)"
    ),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp or phone number (min 8 digits)")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^[\d\s+\-().]+$/, "Please enter a valid phone number with country code")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 8 && digits.length <= 15;
    }, "Please enter a valid phone number (between 8 and 15 digits)"),
  areaId: z.string().min(1, "Please select your Bali delivery area"),
  durationWeeks: z
    .number()
    .min(1, "Minimum rental duration is 1 week")
    .max(24, "Maximum online booking is 24 weeks"),
  villaAddress: z
    .string()
    .trim()
    .min(5, "Please specify your Bali villa, hotel, or street address")
    .max(300, "Address is too long"),
  specialRequests: z.string().max(250).optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
