export function useCurrencify(price) {
    const priceFormatted = price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    const currencySymbol = '$'
    return `${ currencySymbol } ${ priceFormatted }`
  }