import { useEffect, useRef } from "react";

export default function useRemoveHighlight() {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.setSelectionRange(
        titleRef.current.value.length,
        titleRef.current.value.length
      );
    }
  }, []);

  return { titleRef };
}
