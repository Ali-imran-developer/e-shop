import { z } from 'zod';
import { messages } from '@config/messages';
import { fileSchema} from './common-rules';

export const PayNowSchema = z.object({
  //amount: z.string().min(1,{message: messages.amountIsRequired}),
  // date: z.string().min(1,{message: messages.dateIsRequired}),
  method:  z.array(fileSchema).min(1, { message: messages.methodIsRequired }),
  proofPayment: fileSchema,
  transactionID: z.string().min(1,{message: messages.transactionIdIsRequired}),
  namePayee: z.string().min(1, { message: messages.nameIsRequired }),
 
});

// generate form types from zod validation schema
export type PayNowInput = z.infer<typeof PayNowSchema>;
