"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { useJoin } from "../../QuizLobby";
import { JoinProblem, RegisterForm, SignedInBar, useMe } from "../../participant";

/** Direct session link (/quiz/join/CODE): register if needed, then join automatically. */
export function JoinFlow({ code }: { code: string }) {
  const { t } = useI18n();
  const { me, loaded, reload } = useMe();
  const { join, busy, error } = useJoin();
  const attempted = useRef(false);

  useEffect(() => {
    if (me && !attempted.current) {
      attempted.current = true;
      void join(code);
    }
  }, [me, code, join]);

  if (!loaded) return <p className="text-muted">{t("common.loading")}</p>;
  if (!me) return <RegisterForm onRegistered={reload} />;
  return (
    <div className="space-y-4">
      <SignedInBar me={me} onSignOut={reload} />
      {error ? <JoinProblem error={error} onPick={join} /> : <Card>{busy ? t("join.joining") : t("common.loading")}</Card>}
    </div>
  );
}
