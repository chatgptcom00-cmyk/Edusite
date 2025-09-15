
'use server';
/**
 * @fileOverview A customer support chatbot for Edusite.
 *
 * - supportChat - A function that provides answers to user queries and identifies business inquiries.
 * - SupportChatInput - The input type for the supportChat function.
 * - SupportChatOutput - The return type for the supportChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { courses } from '@/lib/courses';
import * as nodemailer from 'nodemailer';

const SupportChatInputSchema = z.object({
  message: z.string().describe('The user\'s message or question.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

const SupportChatOutputSchema = z.object({
  reply: z
    .string()
    .describe('The chatbot\'s response to the user\'s message.'),
  businessInquiryDetected: z
    .boolean()
    .describe('Whether the message was identified as an important business inquiry.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

// This is an insecure method for handling credentials and should not be used in production.
// In a real application, use a secure secret management service.
const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const emailForwardingTool = ai.defineTool(
  {
    name: 'forwardBusinessInquiry',
    description: 'Forwards an important business-related inquiry to the support team via email.',
    inputSchema: z.object({
      summary: z.string().describe('A brief summary of the business inquiry.'),
      originalMessage: z.string().describe('The user\'s original message.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not set. Skipping email forwarding.");
        return "Email forwarding is not configured on the server.";
    }
    try {
        await mailer.sendMail({
            from: `"Edusite Support Bot" <${process.env.GMAIL_USER}>`,
            to: 'pixopnhelp@gmail.com',
            subject: 'Important Business Inquiry from Chatbot',
            text: `An important business inquiry was detected.\n\nSummary: ${input.summary}\n\nOriginal Message: "${input.originalMessage}"`,
            html: `<p>An important business inquiry was detected.</p><h3>Summary</h3><p>${input.summary}</p><h3>Original Message</h3><blockquote>${input.originalMessage}</blockquote>`,
        });
        return "Message successfully forwarded to the business team.";
    } catch (error) {
        console.error("Failed to send email:", error);
        return "Failed to forward the email due to a server error.";
    }
  }
);


const allCourseInfo = courses.map(c => `- ${c.title}: ${c.description}`).join('\n');

const supportChatPrompt = ai.definePrompt({
    name: 'supportChatPrompt',
    input: { schema: SupportChatInputSchema },
    output: { schema: SupportChatOutputSchema },
    tools: [emailForwardingTool],
    system: `You are a friendly and helpful customer support chatbot for an online learning platform called "Edusite".

    Your primary role is to answer user questions about Edusite and its services.
    
    Here is some information about Edusite:
    - Mission: Edusite is an all-in-one educational platform dedicated to making learning completely free for everyone.
    - Offerings: We offer everything from school subjects to graduation-level courses. The platform provides video lectures, PDF notes, study strategies, and free downloads.
    - Unique Value: We provide access to premium and paid lectures at no charge, ensuring quality education is accessible to every learner, regardless of financial background.
    - Founder: Edusite was founded by PixS Organisation.
    
    Here is a list of available courses:
    ${allCourseInfo}

    Your second critical role is to identify important business-related inquiries. These include partnership proposals, media requests, investment opportunities, or other high-stakes commercial discussions.
    
    If you detect such an inquiry, you MUST use the 'forwardBusinessInquiry' tool to send the details to the business team. When using the tool, provide a concise summary of the request.
    
    - When an inquiry is forwarded, set 'businessInquiryDetected' to true in your response.
    - For all other standard support questions (e.g., questions about courses, login issues, how the site works), do NOT use the tool and set 'businessInquiryDetected' to false.
    - Always provide a helpful and direct 'reply' to the user's message, even if you are forwarding it. Do not mention that you are forwarding their message.
    `,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await supportChatPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      // If the model doesn't return a structured output, create a generic reply.
      const fallbackResponse = await ai.generate({
        prompt: `You are a friendly support chatbot. The user said: "${input.message}". Provide a helpful, generic response, but mention that you couldn't fully process their request.`,
      });
      return {
        reply: fallbackResponse.text ?? "I'm sorry, I'm having trouble understanding. Could you please rephrase?",
        businessInquiryDetected: false,
      };
    }
    
    // Default to false if not specified by the model
    output.businessInquiryDetected = output.businessInquiryDetected ?? false;

    return output;
  }
);

export async function supportChat(
  input: SupportChatInput
): Promise<SupportChatOutput> {
  return supportChatFlow(input);
}
