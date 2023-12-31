import { z } from 'zod';

/**
 * Todo: Improve this validation schema
 */
export const authSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2).max(100),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }).min(6).max(25),
  confirm_password: z.string({ required_error: 'Confirm password is required' }).min(6).max(25),
  profile: z.string().optional(),
  emailVerification: z
    .object({
      otp: z
        .number({ required_error: 'OTP is required', invalid_type_error: 'OTP must be a number' })
        .refine((otp) => Number.isInteger(otp) && otp > 100000 && otp < 999999, {
          message: 'OTP must be a 6 digit number',
        }),
      otp_expiry: z.date(),
    })
    .optional()
    .nullable(),
  is_verified: z.boolean(),
  master_password: z.string().optional(),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const otpSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  otp: z
    .number({ required_error: 'OTP is required', invalid_type_error: 'OTP must be a number' })
    .refine((otp) => Number.isInteger(otp) && otp > 100000 && otp < 999999, {
      message: 'OTP must be a 6 digit number',
    }),
});

export type OTPSchemaType = z.infer<typeof otpSchema>;

export const sendVerifyOTPSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2).max(100),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  otp: z
    .number({ required_error: 'OTP is required', invalid_type_error: 'OTP must be a number' })
    .refine((otp) => Number.isInteger(otp) && otp > 100000 && otp < 999999, {
      message: 'OTP must be a 6 digit number',
    }),
});

export type SendVerifyOTPSchemaType = z.infer<typeof sendVerifyOTPSchema>;
