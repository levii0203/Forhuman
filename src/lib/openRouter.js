

const api_key_llama_4_maverick_free="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";
const api_key_deepseek_r1_dstill_32b = "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";
const api_key_llama_4_scout_free = "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";
const api_key_gpt_nano = "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";

const modelOptions = {
  'openai/gpt-3.5-turbo': {
    model: 'openai/gpt-3.5-turbo',
    apiKey: api_key_llama_4_maverick_free //
  },
  'Llama 3.1': {
    model: 'meta-llama/llama-3.1-8b-instruct:free',
    apiKey: api_key_llama_4_scout_free
  },
  'deepseek/deepseek-r1-distill-qwen-32b:free': {
    model: 'deepseek/deepseek-r1-distill-qwen-32b:free',
    apiKey: api_key_deepseek_r1_dstill_32b
  },
  'openai/gpt-4.1-nano': {
    model: 'openai/gpt-4.1-nano',
    apiKey: api_key_gpt_nano
  },
};

export default async function OpenRouter(model,prompt){
    console.log(model)
    const response = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${modelOptions[model].apiKey}`,
          "HTTP-Referer": `https://www.webstylepress.com`,
          "X-Title": `WebStylePress`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: `${model}`,
          messages: [
            {
              role: "system",
              content:
                "You are a game development assistant. When asked to create a game, provide a detailed explanation and include an HTML/JavaScript game code snippet.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });
        const data = await response.json();
        const markdownText = data.choices?.[0]?.message?.content || "No response received.";
        console.log(markdownText)
        return markdownText;
};