export const formatToIDR = (idr: number) => {
  const parsed = idr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${"Rp "}${parsed}`;
};
