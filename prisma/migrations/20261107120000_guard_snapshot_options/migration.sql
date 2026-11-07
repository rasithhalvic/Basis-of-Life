-- Snapshot options may only be added before the session starts.
CREATE FUNCTION reject_option_insert_after_start() RETURNS trigger AS $$
DECLARE s "SessionStatus";
BEGIN
  SELECT qs.status INTO s FROM "SessionQuestion" sq JOIN "QuizSession" qs ON qs.id = sq."sessionId"
   WHERE sq.id = NEW."sessionQuestionId";
  IF s NOT IN ('DRAFT', 'OPEN') THEN
    RAISE EXCEPTION 'Cannot add options to a session with status %', s
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "SessionQuestionOption_insert_before_start" BEFORE INSERT ON "SessionQuestionOption"
  FOR EACH ROW EXECUTE FUNCTION reject_option_insert_after_start();
