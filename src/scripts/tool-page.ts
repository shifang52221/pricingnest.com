import { compute } from "./calculators";

type OutputFormat = "currency" | "number" | "percent" | "text";

type Preset = { label: string; values: Record<string, string> };

function qs(root: ParentNode, selector: string): HTMLElement | null {
  return root.querySelector(selector);
}

function qsa(root: ParentNode, selector: string): HTMLElement[] {
  return Array.from(root.querySelectorAll(selector));
}

function formatCurrency(currency: string, value: number): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: value < 1 ? 6 : 2
  });
  return formatter.format(value);
}

function formatNumber(value: number): string {
  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 });
  return formatter.format(value);
}

function formatPercent(value: number): string {
  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  return `${formatter.format(value)}%`;
}

function readInputs(form: HTMLFormElement): Record<string, string> {
  const inputs: Record<string, string> = {};
  for (const element of Array.from(form.elements)) {
    if (
      !(
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      )
    )
      continue;
    const name = element.name;
    if (!name) continue;
    inputs[name] = element.value;
  }
  return inputs;
}

function setInputsFromQuery(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    const el = form.elements.namedItem(key);
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
    }
  }
}

function buildShareUrl(form: HTMLFormElement): string {
  const url = new URL(window.location.href);
  const params = new URLSearchParams();
  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    if (!element.name) continue;
    params.set(element.name, element.value);
  }
  url.search = params.toString();
  return url.toString();
}

function resetToDefaults(form: HTMLFormElement): void {
  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    const defaultValue = element.getAttribute("data-default");
    if (defaultValue == null) continue;
    element.value = defaultValue;
  }
}

function getPresets(root: HTMLElement): Preset[] {
  const script = root.querySelector<HTMLScriptElement>("script[data-presets]");
  if (!script) return [];
  try {
    const text = script.textContent ?? "[]";
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    return parsed as Preset[];
  } catch {
    return [];
  }
}

function applyPreset(form: HTMLFormElement, preset: Preset): void {
  for (const [name, value] of Object.entries(preset.values)) {
    const el = form.elements.namedItem(name);
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
    }
  }
}

function escapeCsv(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ").trim();
  if (/[",]/.test(normalized)) return `"${normalized.replace(/"/g, '""')}"`;
  return normalized;
}

function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildCsvReport(root: HTMLElement, form: HTMLFormElement): string {
  const inputs = readInputs(form);
  const lines: string[] = [];
  lines.push("Section,Field,Value");

  for (const [name, value] of Object.entries(inputs)) {
    const labelText =
      (root.querySelector(`label[for="${CSS.escape(name)}"]`)?.textContent ?? name).trim() || name;
    lines.push(["Inputs", labelText, value].map(escapeCsv).join(","));
  }

  for (const row of qsa(root, "[data-output]")) {
    const label = (qs(row, ".label")?.textContent ?? row.getAttribute("data-output") ?? "").trim();
    const value = (qs(row, "[data-output-value]")?.textContent ?? "").trim();
    lines.push(["Outputs", label, value].map(escapeCsv).join(","));
  }

  return lines.join("\n");
}

function renderOutputs(root: HTMLElement, currency: string, result: Record<string, number | string>): void {
  for (const row of qsa(root, "[data-output]")) {
    const outputName = row.getAttribute("data-output");
    const format = (row.getAttribute("data-format") as OutputFormat | null) ?? "text";
    const valueEl = qs(row, "[data-output-value]");
    if (!outputName || !valueEl) continue;

    const value = result[outputName];
    if (typeof value === "number") {
      if (format === "currency") valueEl.textContent = formatCurrency(currency, value);
      else if (format === "percent") valueEl.textContent = formatPercent(value);
      else valueEl.textContent = formatNumber(value);
    } else {
      valueEl.textContent = value == null ? "" : String(value);
    }
  }
}

function setupToolPage(root: HTMLElement): void {
  const slug = root.getAttribute("data-tool");
  if (!slug) return;

  const form = qs(root, "form[data-tool-form]");
  if (!(form instanceof HTMLFormElement)) return;

  setInputsFromQuery(form);

  const shareLinkEl = qs(root, "[data-share-link]");
  const copyBtn = qs(root, "button[data-copy-share]");
  const resetBtn = qs(root, "button[data-reset]");
  const presetSelect = root.querySelector<HTMLSelectElement>("select[data-presets-select]");
  const downloadBtn = qs(root, "button[data-download-csv]");

  const recompute = () => {
    const inputs = readInputs(form);
    const currency = inputs.currency || "USD";
    const result = compute(slug, inputs);
    renderOutputs(root, currency, result);
    if (shareLinkEl) shareLinkEl.textContent = buildShareUrl(form);
  };

  form.addEventListener("input", recompute);
  form.addEventListener("change", recompute);
  recompute();

  if (resetBtn instanceof HTMLButtonElement) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetToDefaults(form);
      if (presetSelect) presetSelect.value = "";
      recompute();
    });
  }

  if (presetSelect) {
    const presets = getPresets(root);
    presetSelect.addEventListener("change", () => {
      const selected = presetSelect.value;
      const preset = presets.find((p) => p.label === selected);
      if (!preset) return;
      applyPreset(form, preset);
      recompute();
    });
  }

  if (downloadBtn instanceof HTMLButtonElement) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const csv = buildCsvReport(root, form);
      downloadCsv(`${slug}.csv`, csv);
    });
  }

  if (copyBtn instanceof HTMLButtonElement) {
    copyBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const shareUrl = buildShareUrl(form);
      try {
        await navigator.clipboard.writeText(shareUrl);
        copyBtn.textContent = "Copied";
      } catch {
        window.prompt("Copy this link:", shareUrl);
      } finally {
        window.setTimeout(() => {
          copyBtn.textContent = "Copy share link";
        }, 1200);
      }
    });
  }
}

for (const root of Array.from(document.querySelectorAll<HTMLElement>("[data-tool]"))) {
  setupToolPage(root);
}
