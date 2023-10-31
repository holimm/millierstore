export default function NumberToDollarFormat(number: number){
    let usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    return usd;
}