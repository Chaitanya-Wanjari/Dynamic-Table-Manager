import Papa from "papaparse";
import { saveAs } from "file-saver";

export function convertToCSV(rows: any[], visibleColumns: string[]): string {
  if (!rows || !rows.length) return "";

  const header = visibleColumns.join(",");

  const body = rows
    .map((row) =>
      visibleColumns
        .map((col) => {
          const v = row[col] ?? "";
          const s = typeof v === "string" ? v.replace(/"/g, '""') : `${v}`;
          return `"${s}"`;
        })
        .join(",")
    )
    .join("\n");

  return `${header}\n${body}`;
}

export function exportCSV(rows: any[], visibleColumns: string[]): void {
  const csv = convertToCSV(rows, visibleColumns);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "table_export.csv");
}

export function exportJSON(rows: any[], visibleColumns: string[]): void {
  const visibleData = rows.map((r) =>
    Object.fromEntries(
      Object.entries(r).filter(([k]) => visibleColumns.includes(k))
    )
  );
  const blob = new Blob([JSON.stringify(visibleData, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "table_export.json");
}

export function importCSV(
  file: File
): Promise<{ data: any[]; errors: any[] }> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data, errors } = results;
        const validData = Array.isArray(data)
  ? data.filter(
      (row): row is Record<string, unknown> =>
        typeof row === "object" &&
        row !== null &&
        Object.keys(row as Record<string, unknown>).length > 0
    )
  : [];

        resolve({ data: validData, errors });
      },
      error: (err) => reject(err),
    });
  });
}

export function saveToStorage(key: string, value: any): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("⚠️ Failed to save to localStorage:", err);
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (err) {
    console.warn("⚠️ Failed to load from localStorage:", err);
    return fallback;
  }
}

export function defaultColumns(): string[] {
  return ["name", "email", "age", "role"];
}


export function defaultVisibleColumns(): string[] {
  return ["name", "email", "age", "role"];
}


export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay = 500
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
