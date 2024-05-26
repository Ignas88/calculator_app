import Papa from 'papaparse';
import { type Calculation } from './types';
import { mathTestRegExp, operators, CSV_TYPE } from './constants';

export const download = (data: Calculation[]) => {
  const csv = Papa.unparse(data, {
    header: true,
  });
  const blob = new Blob([csv], { type: CSV_TYPE });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'calculations.csv';
  a.click();
  a.remove();
};
export const isWithOperator = (operation: string) => operators.some((operator) => operation.includes(operator));
export const isValidMathExpression = (operation: string) => mathTestRegExp.test(operation);
