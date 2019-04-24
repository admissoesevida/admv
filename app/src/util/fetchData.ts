/* eslint-disable @typescript-eslint/no-explicit-any */

export default async (url: string): Promise<any> => {
  const res = await fetch(url);

  return await res.json();
};
