import { EmailInputSchemaType } from "@keyguard/lib/validations";

import { Response } from "../../constants";
import { TRPCContext } from "../../createContext";
import { userExisted } from "../../queries/user.query";
import { passwordResetRequest } from "../../utils/passwordResetRequest";

type ForgotPassword = {
  input: EmailInputSchemaType;
  ctx: TRPCContext;
};

export const forgotPasswordController = async ({ input }: ForgotPassword) => {
  const user = await userExisted({ email: input.email });
  // Don't leak the user existed information
  if (!user) {
    return { success: true, message: Response.PASSWORD_RESET_EMAIL_SENT };
  }
  const passwordReqRes = await passwordResetRequest(user);
  return { success: 200, message: passwordReqRes };
};
