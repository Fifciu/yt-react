import { useEffect } from "react";

export function useFocus(ref) {
  useEffect(() => {
    ref?.current?.focus();
  });
}