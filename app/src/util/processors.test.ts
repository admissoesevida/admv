import { toCurrency } from "./processors";

describe("Method: toCurrency", (): void => {
  it("converts a number into currency string", (): void => {
    const value = 10;

    const result = toCurrency(value);

    expect(result).toStrictEqual("R$ 10.00");
  });
});

// Precisa configurar o Travis para suportar locales
// describe("Method: toLocaleDate", (): void => {
//   it("converts a date string into default locale date and time string", (): void => {
//     const value = "2019-03-01T00:00:00.000Z";

//     const result = toLocaleDate(value);

//     expect(result).toStrictEqual("2019-2-28 21:00:00");
//   });

//   it("converts a date string into specific locale date and time string", (): void => {
//     const value = "2019-03-01T00:00:00.000Z";

//     const result = toLocaleDate(value, "pt-br");

//     expect(result).toStrictEqual("2019-2-28 21:00:00");
//   });
// });
