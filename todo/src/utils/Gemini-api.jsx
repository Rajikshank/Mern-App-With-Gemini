import { GoogleGenerativeAI } from "@google/generative-ai";
import { FunctionDeclarationSchemaType } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_URL);

async function run(task) {
  // Choose a model that's appropriate for your use case.
  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    // Set the `responseMimeType` to output JSON
    // Pass the schema object to the `responseSchema` field
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: FunctionDeclarationSchemaType.ARRAY,
        items: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            subtask: {
              type: FunctionDeclarationSchemaType.STRING,
            },
          },
        },
      },
    },
  });

  const prompt = `generate me 3-5  sub tasks in a array  for this ${task},single sub task should not exceep 10 words`;
  //throw Error;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(JSON.parse(text));
    return JSON.parse(text);
  } catch (error) {
    console.log("error in generating subtask", error);
    throw error;
  }
}

export default run;
