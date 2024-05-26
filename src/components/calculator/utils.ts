import Papa from 'papaparse';
import { type Calculation } from './types';

export const download = (data: Calculation[]) => {
  const csv = Papa.unparse(data, {
    header: true,
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'calculations.csv';
  a.click();
  a.remove();
};
