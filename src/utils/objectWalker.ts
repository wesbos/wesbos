type FindInObjectParams = {
  obj: any;
  targetKey?: string | string[];
  targetValue?: any;
  currentPath?: string[];
};

type WalkResult = {
  path: string[];
  parent: any;
  value: any;
} | null;

/**
 * Walks through a nested object to find a specific key/value pair
 * @param obj The object to search through
 * @param targetKey The key to look for
 * @param targetValue The value to match (optional)
 * @param currentPath The current path being traversed (used internally)
 * @returns Object containing the path and parent object, or null if not found
 */

export function findInObject({ obj, targetKey, targetValue, currentPath = [] }: FindInObjectParams): WalkResult {
  // Handle array of keys
  if (Array.isArray(targetKey)) {
    let currentObj = obj;
    let currentResult: WalkResult = null;

    // Process each key in sequence
    for (const key of targetKey) {
      currentResult = findInObject({
        obj: currentObj,
        targetKey: key,
        currentPath: currentResult ? currentResult.path : [],
      });

      if (!currentResult) return null;
      currentObj = currentResult.value;
    }

    // Only check targetValue against final result
    if (targetValue !== undefined && currentResult?.value !== targetValue) {
      return null;
    }

    return currentResult;
  }

  // Original single key logic
  if (!obj || typeof obj !== 'object') {
    return null;
  }

  for (const [key, value] of Object.entries(obj)) {
    const newPath = [...currentPath, key];

    // Check if this matches our search criteria
    if (
      // Match if targetKey is undefined or matches current key
      (targetKey === undefined || key === targetKey) &&
      // AND if targetValue is undefined or matches current value
      (targetValue === undefined || value === targetValue)
    ) {
      return {
        path: newPath,
        parent: obj,
        value,
      };
    }

    // Recursively search nested objects and arrays
    if (value && typeof value === 'object') {
      const result = findInObject({
        obj: value,
        targetKey,
        targetValue,
        currentPath: newPath,
      });
      if (result) {
        return result;
      }
    }
  }

  return null;
}

export function getNestedValue(obj: any, path: string[]) {
  try {
    return path.reduce((acc, key) => acc?.[key], obj);
  } catch (e) {
    return null;
  }
}
