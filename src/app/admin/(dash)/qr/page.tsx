"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, Card, buttonClass } from "@/components/ui";
import { api } from "@/lib/client-api";

interface Info {
  baseUrl: string;
  warnings: string[];
  pioneers: { slug: string; name: string; url: string }[];
}

export default function AdminQrPage() {
  const [info, setInfo] = useState<Info | null>(null);
  const [ack, setAck] = useState(false);
  useEffect(() => {
    api<Info>("/api/admin/qr").then((r) => r.ok && setInfo(r.data));
  }, []);
  if (!info) return <p>Loading…</p>;
  const blocked = info.warnings.length > 0 && !ack;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-burgundy-deep">QR codes</h1>
      <Card>
        <p>
          Codes point to <code className="rounded bg-ivory px-1">{info.baseUrl}/pioneers/…</code>{" "}
          <Link href="/admin/settings" className="text-burgundy underline">Change base URL</Link>
        </p>
        {info.warnings.length > 0 && (
          <div className="mt-4">
            <Alert tone="error">
              <p className="font-semibold">Do not print these codes yet:</p>
              <ul className="mt-1 list-disc pl-5">
                {info.warnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
              <label className="mt-3 flex items-center gap-2">
                <input type="checkbox" className="h-5 w-5" checked={ack} onChange={(e) => setAck(e.target.checked)} />
                I understand — show downloads for testing only
              </label>
            </Alert>
          </div>
        )}
        {!blocked && (
          <a className={`${buttonClass()} mt-4`} href="/api/admin/qr/all">
            Download all ({info.pioneers.length}) as ZIP (SVG + PNG)
          </a>
        )}
      </Card>
      {!blocked && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.pioneers.map((p) => (
            <li key={p.slug}>
              <Card className="space-y-3 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/admin/qr?slug=${p.slug}&format=svg`} alt={`QR code for ${p.name}`} className="mx-auto h-40 w-40" />
                <p className="font-semibold">{p.name}</p>
                <a href={p.url} target="_blank" rel="noreferrer" className="block break-all text-xs text-burgundy underline">{p.url}</a>
                <div className="flex justify-center gap-2">
                  <a className={buttonClass("secondary", "min-h-10! px-3! py-1! text-sm")} href={`/api/admin/qr?slug=${p.slug}&format=svg`}>SVG</a>
                  <a className={buttonClass("secondary", "min-h-10! px-3! py-1! text-sm")} href={`/api/admin/qr?slug=${p.slug}&format=png`}>PNG</a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
