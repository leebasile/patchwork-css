import { describe, it, expect } from "vitest";
import {
  buildLayerOrder,
  wrapInLayer,
  resolveLayer,
  resolveLayers,
} from "./layer";

describe("buildLayerOrder", () => {
  it("returns empty string for empty order", () => {
    expect(buildLayerOrder([])).toBe("");
  });

  it("returns a single layer declaration", () => {
    expect(buildLayerOrder(["base"])).toBe("@layer base;");
  });

  it("returns multiple layers in order", () => {
    expect(buildLayerOrder(["reset", "base", "utilities"])).toBe(
      "@layer reset, base, utilities;"
    );
  });
});

describe("wrapInLayer", () => {
  it("wraps css in a named layer block", () => {
    const result = wrapInLayer("utilities", ".text-red { color: red; }");
    expect(result).toBe(
      "@layer utilities {\n.text-red { color: red; }\n}"
    );
  });

  it("returns empty string for empty css", () => {
    expect(wrapInLayer("base", "  ")).toBe("");
  });
});

describe("resolveLayer", () => {
  it("resolves a layer with no explicit order", () => {
    const layer = resolveLayer({ name: "base" });
    expect(layer.name).toBe("base");
    expect(layer.declaration).toBe("@layer base;");
    expect(layer.wrap(".foo { margin: 0; }")).toContain("@layer base");
  });

  it("includes the layer name in order if missing", () => {
    const layer = resolveLayer({ name: "utilities", order: ["reset", "base"] });
    expect(layer.declaration).toBe("@layer utilities, reset, base;");
  });

  it("uses provided order when name is already present", () => {
    const layer = resolveLayer({
      name: "base",
      order: ["reset", "base", "utilities"],
    });
    expect(layer.declaration).toBe("@layer reset, base, utilities;");
  });
});

describe("resolveLayers", () => {
  it("returns a shared declaration and individual layer resolvers", () => {
    const { declaration, layers } = resolveLayers([
      { name: "reset" },
      { name: "base" },
      { name: "utilities" },
    ]);

    expect(declaration).toBe("@layer reset, base, utilities;");
    expect(layers).toHaveLength(3);
    expect(layers[0].name).toBe("reset");
    expect(layers[2].wrap(".mt-4 { margin-top: 1rem; }")).toContain(
      "@layer utilities"
    );
  });

  it("handles a single layer", () => {
    const { declaration, layers } = resolveLayers([{ name: "base" }]);
    expect(declaration).toBe("@layer base;");
    expect(layers[0].declaration).toBe("@layer base;");
  });
});
