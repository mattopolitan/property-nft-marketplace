export function middleEllipsis (text) {
  const len = 6;
  if (!text) return ''
  return `${text.substr(0, len)}...${text.substr(text.length - len, text.length)}`;
}