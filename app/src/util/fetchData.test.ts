import fetchData from "./fetchData";

it("fetches data from API", async (): Promise<void> => {
  const mockJsonPromise = Promise.resolve({});
  const mockFetchPromise = Promise.resolve({
    json: (): Promise<object> => mockJsonPromise
  });

  jest
    .spyOn(global, "fetch")
    .mockImplementation((): Promise<object> => mockFetchPromise);

  await fetchData("/api");

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith("/api");
});
