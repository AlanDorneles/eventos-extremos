import moment from 'moment';

const actualDate = moment(); 
const lastDay = actualDate.clone().subtract(1, 'day');

export const formattedDataFinal = actualDate.format('YYYY-MM-DD');
export const formattedDataInit = lastDay.format('YYYY-MM-DD');