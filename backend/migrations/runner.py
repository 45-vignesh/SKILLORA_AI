import logging
from typing import List, Dict, Any
from sqlalchemy import text
from sqlalchemy.engine import Engine
from backend.database.connection import engine as default_engine
from backend.migrations import v001_multi_college_isolation

logger = logging.getLogger("skillora.migrations")

MIGRATIONS = [
    v001_multi_college_isolation,
]


def ensure_migrations_table(eng: Engine) -> None:
    with eng.begin() as conn:
        conn.execute(text(
            "CREATE TABLE IF NOT EXISTS schema_migrations ("
            "version VARCHAR(128) PRIMARY KEY, "
            "description TEXT NOT NULL, "
            "applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
            ")"
        ))


def run_migrations(eng: Engine = None) -> List[Dict[str, Any]]:
    target_engine = eng or default_engine
    ensure_migrations_table(target_engine)

    with target_engine.connect() as conn:
        applied = {
            row[0]
            for row in conn.execute(text("SELECT version FROM schema_migrations")).fetchall()
        }

    results: List[Dict[str, Any]] = []
    for mig in MIGRATIONS:
        if mig.VERSION in applied:
            results.append({"version": mig.VERSION, "status": "already_applied"})
            continue

        report = mig.upgrade(target_engine)
        with target_engine.begin() as conn:
            conn.execute(
                text("INSERT INTO schema_migrations (version, description) VALUES (:v, :d)"),
                {"v": mig.VERSION, "d": mig.DESCRIPTION},
            )
        report["status"] = "applied"
        results.append(report)
        logger.info("Applied migration %s", mig.VERSION)

    return results


if __name__ == "__main__":
    import json
    res = run_migrations()
    print(json.dumps(res, indent=2))
