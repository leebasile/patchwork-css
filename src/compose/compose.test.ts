import { describe, it, expect } from "vitest";
import { compose } from "./compose";

describe("compose", () => {
  const btn = compose({
    base: "btn",
    variants: {
      size: { sm: "btn-sm", md: "btn-md", lg: "btn-lg" },
      intent: { primary: "btn-primary", danger: "btn-danger" },
    },
    defaultVariants: { size: "md", intent: "primary" },
    compoundVariants: [
      { variants: { size: "lg", intent: "danger" }, classes: "btn-loud" },
    ],
  });

  it("returns base classes with defaults when called with no args", () => {
    expect(btn()).toBe("btn btn-md btn-primary");
  });

  it("overrides a single variant", () => {
    expect(btn({ size: "sm" })).toBe("btn btn-sm btn-primary");
  });

  it("overrides multiple variants", () => {
    expect(btn({ size: "lg", intent: "danger" })).toBe(
      "btn btn-lg btn-danger btn-loud"
    );
  });

  it("does not apply compound variant when only one condition matches", () => {
    expect(btn({ size: "lg" })).toBe("btn btn-lg btn-primary");
  });

  it("deduplicates repeated classes", () => {
    const dup = compose({ base: ["foo", "foo", "bar"] });
    expect(dup()).toBe("foo bar");
  });

  it("handles array base classes", () => {
    const c = compose({ base: ["a", "b", "c"] });
    expect(c()).toBe("a b c");
  });

  it("handles array variant classes", () => {
    const c = compose({
      variants: { color: { red: ["text-red", "border-red"] } },
    });
    expect(c({ color: "red" })).toBe("text-red border-red");
  });

  it("ignores undefined variant selections", () => {
    expect(btn({ size: undefined })).toBe("btn btn-md btn-primary");
  });

  it("returns empty string for empty config", () => {
    const empty = compose({});
    expect(empty()).toBe("");
  });

  it("handles compound variant with array classes", () => {
    const c = compose({
      base: "card",
      variants: {
        size: { lg: "card-lg" },
        intent: { danger: "card-danger" },
      },
      compoundVariants: [
        { variants: { size: "lg", intent: "danger" }, classes: ["card-loud", "card-alert"] },
      ],
    });
    expect(c({ size: "lg", intent: "danger" })).toBe(
      "card card-lg card-danger card-loud card-alert"
    );
  });
});
