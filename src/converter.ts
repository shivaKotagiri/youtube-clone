function converter(viewCount: string | number): string {
  const count = typeof viewCount === 'string' ? parseInt(viewCount, 10) : viewCount;

  if (isNaN(count)) {
    return '0';
  }
  if (count < 1000) {
    return `${count}`;
  } else if (count < 1000000) {
    const thousands = (count / 1000).toFixed(1);
    const formatted = thousands.endsWith('.0') ? thousands.slice(0, -2) : thousands;
    return `${formatted}K`;
  } else if (count < 1000000000) {
    const millions = (count / 1000000).toFixed(1);
    const formatted = millions.endsWith('.0') ? millions.slice(0, -2) : millions;
    return `${formatted}M`;
  } else {
    const billions = (count / 1000000000).toFixed(1);
    const formatted = billions.endsWith('.0') ? billions.slice(0, -2) : billions;
    return `${formatted}B`;
  }
}

export default converter;

