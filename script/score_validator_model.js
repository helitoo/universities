import { round2 } from "./score_convert_model.js";

export function getValidValue(value, isInt, min, max, appreciate) {
  let temp = value.replace(",", ".").replace(/[^0-9\.]/g, "");

  if (isInt) temp = parseInt(temp);
  else temp = parseFloat(temp);

  if (Number.isNaN(temp)) return null;

  value = temp;

  value = Math.max(value, min);

  if (max != 10) value = Math.min(value, max);
  else if (!isInt) while (value > 10) value /= 10;

  if (!isInt) value = round2(value, 2);

  return value;
}

// score : object {subject: score, ...} ("dgsg") or Number (others)

export function getValidScore(score, exam, appreciate) {
  switch (exam) {
    case "thhb":
    case "thpt":
    case "dgsp":
    case "dgcb":
    case "thnk":
      return getValidValue(score, false, 0, 10, appreciate);
    case "dgtd":
    case "dgca":
      return getValidValue(score, false, 0, 100, appreciate);
    case "dghn":
      return getValidValue(score, false, 0, 150, appreciate);
    case "vsat":
      return getValidValue(score, false, 0, 150, appreciate);
    case "dgsg":
      return (
        getValidValue(score.nn, true, 0, 600, appreciate) +
        getValidValue(score.to, true, 0, 300, appreciate) +
        getValidValue(score.kh, true, 0, 300, appreciate)
      );
  }
}
