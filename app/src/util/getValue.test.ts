import getValue from "./getValue";

it("gets a value inside an object", (): void => {
  const obj = {
    value: "a"
  };
  const value = getValue(obj, "value");

  expect(value).toStrictEqual("a");
});

it("gets a nested value deep inside an object", (): void => {
  const obj = {
    parent: {
      parent: {
        parent: {
          parent: {
            value: "a"
          }
        }
      }
    }
  };
  const value = getValue(obj, "parent.parent.parent.parent.value");

  expect(value).toStrictEqual("a");
});

it("gets a processed value inside an object", (): void => {
  const obj = {
    value: "10.12345"
  };
  const value = getValue(
    obj,
    "value",
    (v: string): string => {
      return parseInt(v).toFixed(0);
    }
  );

  expect(value).toStrictEqual("10");
});
