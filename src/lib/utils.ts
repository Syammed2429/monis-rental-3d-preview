export { cn } from "cn";
export * from "./pricing";

/**
 * Safely copies text to the system clipboard across both Secure Contexts
 * (https / localhost) and non-secure LAN mobile contexts (e.g. http://192.168.x.x:3000)
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  // 1. Try modern Async Clipboard API if available and in secure context
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator?.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or non-secure context — proceed to legacy fallback
  }

  // 2. Cross-platform fallback using temporary textarea + execCommand for iOS & non-secure LAN
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Prevent zoom and scrolling on iOS
    textArea.style.fontSize = "12pt";
    textArea.style.border = "0";
    textArea.style.padding = "0";
    textArea.style.margin = "0";
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    textArea.setAttribute("readonly", "");

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
