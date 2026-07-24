export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
