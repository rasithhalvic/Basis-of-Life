/**
 * RFC 4180 CSV with protection against spreadsheet formula injection
 * (cells starting with = + - @ tab or CR are prefixed with an apostrophe).
 */
export function toCsv(rows: (string | number | null | undefined)[][]): string {
  return (
    "﻿" + // BOM so Excel opens UTF-8 (Sinhala) correctly
    rows
      .map((row) =>
        row
          .map((cell) => {
            if (cell === null || cell === undefined) return "";
            let v = String(cell);
            if (typeof cell === "string" && /^[=+\-@\t\r]/.test(v)) v = `'${v}`;
            return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
          })
          .join(","),
      )
      .join("\r\n") +
    "\r\n"
  );
}
