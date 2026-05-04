export type StudyMessage = {
  role: 'user' | 'model';
  text: string;
};

export async function getStudyHelp(query: string, history: StudyMessage[] = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, history }),
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Chat service error:", error);
    return "I encountered an error while trying to help. Please try again later.";
  }
}

export async function quickSolve(tool: string, input: string) {
  try {
    const response = await fetch('/api/tool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, input }),
    });

    if (!response.ok) throw new Error('Tool request failed');
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Tool service error:", error);
    return "Failed to process tool request.";
  }
}
