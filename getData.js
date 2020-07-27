import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/vlntsolo/392bcf6e094dd2f69c24de0409cf04b3/raw/8ede38c190bd166a33d5c13c246d1c3beae3c9f3/usaid-ua.csv';

export const getData = async () => {
  const data = await csv(csvUrl);
  
  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};