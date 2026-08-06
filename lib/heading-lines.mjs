export function breakOffsets(lines) {
  let offset = 0;

  return lines.slice(0, -1).map((line) => {
    offset += line.length;
    return offset;
  });
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every((line) => typeof line === "string" && line.length > 0);
}

export function validatedLinePlan(lines, candidate) {
  if (!isNonEmptyStringArray(lines) || !isNonEmptyStringArray(candidate)) {
    return null;
  }

  return candidate.join("") === lines.join("") ? candidate : null;
}
