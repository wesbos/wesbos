const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });

export const formatNumber = (number: number) => formatter.format(number);
