export default function NumberToDollarFormat(number: number | undefined) {
  let usd;
  if (number !== undefined)
    usd = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  return usd;
}
