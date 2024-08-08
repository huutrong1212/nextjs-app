export function roundingNumber(
  number: string | number,
  separator?: string,
  place?: number | string,
) {
  const _number = number.toString().replace(',', '.');
  if (separator) {
    const coefficient = Math.pow(10, Number(place));
    const result = (Math.round(Number(_number) * coefficient) / coefficient)
      .toString()
      .replace(separator === '.' ? ',' : '.', separator);

    return result.toString();
  } else {
    return Math.ceil(Number(_number)).toString();
  }
}
