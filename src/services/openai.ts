import type { Difficulty, Prediction, PredictionCategory, ValidationResult } from "../types";

const openAiKey = import.meta.env.VITE_OPENAI_API_KEY;

function inferDifficulty(rawText: string): Difficulty {
  const text = rawText.toLowerCase();
  if (text.includes("before") && (text.includes("100k") || text.includes("ipo"))) {
    return "Very Hard";
  }
  if (text.includes("market") || text.includes("release") || text.includes("billboard")) {
    return "Hard";
  }
  if (text.length > 120) return "Medium";
  return "Easy";
}

function rewardForDifficulty(difficulty: Difficulty) {
  if (difficulty === "Very Hard") return 100;
  if (difficulty === "Hard") return 50;
  if (difficulty === "Medium") return 15;
  return 5;
}

export async function validatePrediction(
  rawText: string,
  category: PredictionCategory,
  deadline: string,
): Promise<ValidationResult> {
  const difficulty = inferDifficulty(rawText);
  const cleanEnd = rawText.trim().replace(/[?.!]+$/, "");
  const measurable = /\d|before|after|by|reach|release|win|enter|close|file/i.test(rawText);

  if (!openAiKey) {
    return {
      isMeasurable: measurable,
      cleanedText: `${cleanEnd} by ${new Date(deadline).toLocaleDateString()}.`,
      resolutionCriteria: measurable
        ? `Resolve true if a reputable public source confirms this outcome on or before ${new Date(
            deadline,
          ).toLocaleDateString()}.`
        : "Make this measurable with a named outcome, source, and deadline.",
      category,
      difficulty,
      potentialRewardCredits: rewardForDifficulty(difficulty),
      feedback: measurable
        ? "Demo validation passed. FutureScore cleaned your prediction into a measurable contract."
        : "This needs a clearer measurable outcome before it can be locked.",
    };
  }

  return {
    isMeasurable: measurable,
    cleanedText: `${cleanEnd} by ${new Date(deadline).toLocaleDateString()}.`,
    resolutionCriteria:
      "OpenAI service placeholder. Replace this block with a Responses API validation call when keys are available.",
    category,
    difficulty,
    potentialRewardCredits: rewardForDifficulty(difficulty),
    feedback: "OpenAI key detected. Live validation hook is ready to be implemented.",
  };
}

export async function scoreDifficulty(cleanedPrediction: string): Promise<Difficulty> {
  return inferDifficulty(cleanedPrediction);
}

export async function resolvePrediction(prediction: Prediction) {
  return {
    predictionId: prediction.id,
    resolvedOutcome: prediction.predictedOutcome,
    confidence: 0.82,
    source: "Mock resolver",
  };
}
