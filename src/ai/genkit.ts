
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { geminiPro } from 'genkit/models';
import { GoogleAI } from '@google-ai/generativelanguage';

// Note: This configuration is for OpenRouter.
// You can get your API key from https://openrouter.ai/keys
const openRouterKey = process.env.OPENROUTER_API_KEY;

if (!openRouterKey) {
  throw new Error(
    'OPENROUTER_API_KEY is not defined. Please set it in your .env file.'
  );
}

const customClient = new GoogleAI(openRouterKey, {
  apiEndpoint: 'https://openrouter.ai/api/v1',
});

const geminiProCustom = geminiPro({
  client: customClient,
  // OpenRouter model identifier
  model: 'google/gemini-pro',
});

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: openRouterKey,
    }),
  ],
  models: [geminiProCustom],
  model: 'google/gemini-pro', // Set the custom model as default
});
