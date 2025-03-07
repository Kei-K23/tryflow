import { safeExecute } from "../src/index";

describe("safeExecute", () => {
  it("should return result when function executes successfully", async () => {
    const fn = async () => "Success";
    const safeFn = safeExecute(fn);
    const [result, error] = await safeFn();
    expect(result).toBe("Success");
    expect(error).toBeNull();
  });

  it("should return error when function throws", async () => {
    const fn = async () => {
      throw new Error("Failure");
    };
    const safeFn = safeExecute(fn);
    const [result, error] = await safeFn();
    expect(result).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Failure");
  });

  it("should return fallback result when function failure", async () => {
    const fn = async () => {
      throw new Error("Failure");
    };
    const fallbackFn = async () => "Fallback Success";
    const safeFn = safeExecute(fn, {
      fallback: fallbackFn,
    });
    const [result, error] = await safeFn();
    expect(result).toBe("Fallback Success");
    expect(error).toBeNull();
  });

  it("should return fallback error when fallback function throws", async () => {
    const fn = async () => {
      throw new Error("Failure");
    };
    const fallbackFn = async () => {
      throw new Error("Fallback Fn Failure");
    };
    const safeFn = safeExecute(fn, {
      fallback: fallbackFn,
    });
    const [result, error] = await safeFn();
    expect(result).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Fallback Fn Failure");
  });
});
