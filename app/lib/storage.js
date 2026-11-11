/** Storage access itself can throw (privacy settings, sandboxed frames). */
/** @param {"localStorage" | "sessionStorage"} kind @param {string} key */
export function safeReadStorage(kind, key) {
  try {
    if (typeof window === "undefined") return { available: false, value: null };
    return { available: true, value: window[kind].getItem(key) };
  } catch {
    return { available: false, value: null };
  }
}

/** @param {"localStorage" | "sessionStorage"} kind @param {string} key @param {string} value */
export function safeWriteStorage(kind, key, value) {
  try {
    if (typeof window === "undefined") return false;
    window[kind].setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** @param {"localStorage" | "sessionStorage"} kind @param {string} key */
export function safeRemoveStorage(kind, key) {
  try {
    if (typeof window === "undefined") return false;
    window[kind].removeItem(key);
    return true;
  } catch {
    return false;
  }
}
