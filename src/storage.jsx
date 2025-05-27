import { useEffect } from "react";
import { useState } from "react";

const NAME = "-code-pen";

export default function useLocalStorage(key, initialValue) {
  const codeKey = key + NAME;

  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(codeKey);
      if (jsonValue != null) return JSON.parse(jsonValue);
    } catch (e) {
      console.error("Failed to parse localStorage value:", e);
    }

    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(codeKey, JSON.stringify(value));
  }, [codeKey, value]);
  return [value, setValue];
}
