'use server';
/**
 * @fileOverview Hanes Assistant AI Interaction — OpenRouter direct inference.
 *
 * - aiPlaygroundInteraction       — non-streaming response
 * - aiPlaygroundInteractionStream — streaming response (async generator)
 */

const SYSTEM_PROMPT = `You are Hanes Assistant, a highly capable AI portfolio assistant for Hanes.
Your primary role is to answer questions about Hanes' expertise in AI Engineering, LLMs, GenAI, RAG, and Computer Vision.
You are also an expert in project planning and technical architecture for AI-driven solutions.

Key expertise:
1. LLM Architectures: Fine-tuning, Deployment, and Prompt Engineering.
2. AI Automation: Building autonomous agents and complex workflows.
3. NLP & RAG: Sophisticated Retrieval Augmented Generation systems.
4. Computer Vision: Object detection, segmentation, and facial recognition.

Mampu menjawab sesuai content portofolio Hanes dan memberikan insight tentang planning project technical.
Be professional, creative, and concise. Always prioritize helping users understand how Hanes can build intelligent systems.
Answer based on provided context and your deep knowledge of AI project planning.`;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-oss-120b:free';

function getApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is not set');
  return key;
}

export async function aiPlaygroundInteraction(input: string): Promise<string> {
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: input },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenRouter Error:', res.status, errText);
      return "I'm sorry, I couldn't generate a response.";
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('OpenRouter Error:', error);
    return 'I encountered an error. Please try again.';
  }
}

export async function aiPlaygroundInteractionStream(input: string) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: input },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => '');
    console.error('OpenRouter Stream Error:', res.status, errText);
    return (async function* () {
      yield "I'm sorry, I couldn't generate a response.";
    })();
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');

  return (async function* () {
    let buffer = '';
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line || !line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') return;

          try {
            const json = JSON.parse(payload);
            const delta = json?.choices?.[0]?.delta?.content;
            if (typeof delta === 'string' && delta.length > 0) {
              yield delta;
            }
          } catch {
            // ignore malformed SSE keep-alive / comment lines
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  })();
}
