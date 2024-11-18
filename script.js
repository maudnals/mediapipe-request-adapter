import {
  FilesetResolver,
  LlmInference,
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai';

// gemma-2b
const MODEL_URL =
  'https://storage.googleapis.com/jmstore/kaggleweb/grader/g-2b-it-gpu-int4.bin';
const MEDIAPIPE_WASM =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm';

(async function () {
  console.log('Loading model');
  document.getElementById('status').innerText = '🔵 Loading model...';
  try {
    const genai = await FilesetResolver.forGenAiTasks(MEDIAPIPE_WASM);
    const llmInference = await LlmInference.createFromModelPath(
      genai,
      MODEL_URL
    );
    document.getElementById('status').innerText = '🟢 Model ready!';
    const inputPrompt = document.getElementById('input').value;
    const response = await llmInference.generateResponse(inputPrompt);
    console.log(response);
    document.getElementById('output').innerText = response;
  } catch (e) {
    console.log(e);
    document.getElementById('status').innerText = '🔴 Model error!';
  }
})();
