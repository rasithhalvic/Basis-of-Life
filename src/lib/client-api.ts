"use client";

import { useEffect, useRef, useState } from "react";

export interface ApiFailure {
  status: number;
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiFailure };

/** Same-origin JSON fetch that never throws; cookies are sent automatically. */
export async function api<T>(path: string, init?: { method?: string; body?: unknown; signal?: AbortSignal }): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method: init?.method ?? "GET",
      headers: init?.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
      credentials: "same-origin",
      signal: init?.signal,
    });
    const data = await res.json().catch(() => null);
    if (res.ok) return { ok: true, data: data as T };
    const err = data?.error ?? {};
    return {
      ok: false,
      error: { status: res.status, code: err.code ?? "INTERNAL_ERROR", message: err.message ?? res.statusText, details: err.details },
    };
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    return { ok: false, error: { status: 0, code: "NETWORK", message: "Network error" } };
  }
}

/**
 * Polls an endpoint. `interval(data)` picks the next delay from the latest
 * data; failures back off exponentially (to 30 s) with jitter so a room of
 * phones on shared Wi-Fi does not retry in lockstep.
 */
export function usePoll<T>(path: string | null, interval: (data: T | null) => number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiFailure | null>(null);
  const [failures, setFailures] = useState(0);
  const intervalRef = useRef(interval);
  const kick = useRef<() => void>(() => {});
  useEffect(() => {
    intervalRef.current = interval;
  });

  useEffect(() => {
    if (!path) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let fails = 0;
    const controller = new AbortController();

    const tick = async () => {
      clearTimeout(timer);
      if (stopped) return;
      let delay: number;
      try {
        const r = await api<T>(path, { signal: controller.signal });
        if (stopped) return;
        if (r.ok) {
          fails = 0;
          setData(r.data);
          setError(null);
          delay = intervalRef.current(r.data);
        } else {
          fails++;
          setError(r.error);
          const retryAfter = Number(r.error.details?.retryAfterSeconds ?? 0) * 1000;
          delay = Math.max(retryAfter, Math.min(30_000, 1000 * 2 ** Math.min(fails, 5)));
          if (r.error.status === 404 || r.error.status === 401) delay = Math.max(delay, 15_000);
        }
      } catch {
        return; // aborted
      }
      setFailures(fails);
      const jitter = delay * (0.85 + Math.random() * 0.3);
      if (document.visibilityState === "hidden") delay = Math.max(delay, 10_000);
      timer = setTimeout(tick, fails ? jitter : delay);
    };
    kick.current = () => void tick();
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [path]);

  return { data, error, failures, refresh: () => kick.current() };
}

/** Server-aligned clock so countdowns follow the server, not the phone's clock. */
export function useServerClock(serverNow: string | null | undefined) {
  const offset = useRef(0);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (serverNow) offset.current = new Date(serverNow).getTime() - Date.now();
  }, [serverNow]);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now() + offset.current), 250);
    return () => clearInterval(id);
  }, []);
  return now;
}
