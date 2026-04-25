import { describe, it, expect } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  it("returns empty string when given no arguments", () => {
    expect(cx()).toBe("");
  });

  it("returns a single class string unchanged", () => {
    expect(cx("btn")).toBe("btn");
  });

  it("joins multiple string inputs", () => {
    expect(cx("btn", "btn--primary")).toBe("btn btn--primary");
  });

  it("filters out falsy values", () => {
    expect(cx("btn", false, null, undefined, 0, "btn--active")).toBe(
      "btn btn--active"
    );
  });

  it("includes keys from object where value is truthy", () => {
    expect(cx({ "btn--active": true, "btn--disabled": false })).toBe(
      "btn--active"
    );
  });

  it("handles mixed string and object inputs", () => {
    expect(cx("btn", { "btn--active": true, "btn--ghost": false })).toBe(
      "btn btn--active"
    );
  });

  it("deduplicates repeated class names", () => {
    expect(cx("btn", "btn", "btn--primary")).toBe("btn btn--primary");
  });

  it("deduplicates across string and object inputs", () => {
    expect(cx("btn", { btn: true, "btn--active": true })).toBe(
      "btn btn--active"
    );
  });

  it("splits space-separated classes in strings", () => {
    expect(cx("btn btn--primary", "extra")).toBe("btn btn--primary extra");
  });

  it("splits space-separated keys in object inputs", () => {
    expect(cx({ "btn btn--primary": true })).toBe("btn btn--primary");
  });

  it("handles null-valued object entries", () => {
    expect(cx({ "btn--active": null, "btn--primary": true })).toBe(
      "btn--primary"
    );
  });
});
