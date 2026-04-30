import { describe, it, expect } from "vitest";
import { merge, flattenClassInput, getClassPrefix } from "./merge";

describe("getClassPrefix", () => {
  it("returns the first segment before a dash", () => {
    expect(getClassPrefix("text-red-500")).toBe("text");
    expect(getClassPrefix("bg-blue-100")).toBe("bg");
    expect(getClassPrefix("p-4")).toBe("p");
  });

  it("returns the full class if no dash", () => {
    expect(getClassPrefix("block")).toBe("block");
    expect(getClassPrefix("flex")).toBe("flex");
  });
});

describe("flattenClassInput", () => {
  it("handles null and undefined", () => {
    expect(flattenClassInput(null)).toEqual([]);
    expect(flattenClassInput(undefined)).toEqual([]);
  });

  it("splits a string by whitespace", () => {
    expect(flattenClassInput("text-sm font-bold")).toEqual(["text-sm", "font-bold"]);
  });

  it("flattens an array of strings", () => {
    expect(flattenClassInput(["text-sm", "font-bold bg-white"])).toEqual([
      "text-sm",
      "font-bold",
      "bg-white",
    ]);
  });

  it("filters a record by truthy values", () => {
    expect(flattenClassInput({ "text-sm": true, "font-bold": false, "bg-white": true })).toEqual([
      "text-sm",
      "bg-white",
    ]);
  });
});

describe("merge", () => {
  it("merges two class strings, later wins on conflict", () => {
    expect(merge("text-sm", "text-lg")).toBe("text-lg");
  });

  it("preserves non-conflicting classes", () => {
    expect(merge("text-sm bg-red-500", "font-bold")).toBe("text-sm bg-red-500 font-bold");
  });

  it("handles multiple inputs", () => {
    expect(merge("text-sm", "text-md", "text-lg")).toBe("text-lg");
  });

  it("handles null and undefined inputs gracefully", () => {
    expect(merge(null, "text-sm", undefined)).toBe("text-sm");
  });

  it("handles record inputs", () => {
    expect(merge({ "text-sm": true, "font-bold": false }, "font-semibold")).toBe(
      "text-sm font-semibold"
    );
  });

  it("returns empty string for all empty inputs", () => {
    expect(merge(null, undefined, "")).toBe("");
  });
});
