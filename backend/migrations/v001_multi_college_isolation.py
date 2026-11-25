from typing import Dict, Any, List
from sqlalchemy import inspect, text
from sqlalchemy.engine import Engine

VERSION = "001_multi_college_isolation"
DESCRIPTION = "Add institution_id FK (ON DELETE SET NULL) and indexes for multi-college data isolation"


def _has_column(insp, table: str, column: str) -> bool:
    return any(col["name"] == column for col in insp.get_columns(table))


def _has_index(insp, table: str, index_name: str) -> bool:
    return any(idx["name"] == index_name for idx in insp.get_indexes(table))


def upgrade(engine: Engine) -> Dict[str, Any]:
    insp = inspect(engine)
    dialect = engine.dialect.name
    report: Dict[str, Any] = {
        "version": VERSION,
        "schema_changes": [],
        "migrated_students": 0,
        "unmapped_students": [],
        "migrated_academicians": 0,
        "unmapped_academicians": [],
    }

    with engine.begin() as conn:
        # 1. Add institution_id column & FK to students
        if not _has_column(insp, "students", "institution_id"):
            if dialect == "postgresql":
                conn.execute(text(
                    "ALTER TABLE students "
                    "ADD COLUMN institution_id INTEGER NULL "
                    "REFERENCES institutions(id) ON DELETE SET NULL"
                ))
            else:
                conn.execute(text(
                    "ALTER TABLE students ADD COLUMN institution_id INTEGER NULL"
                ))
            report["schema_changes"].append("Added students.institution_id (FK -> institutions.id, ON DELETE SET NULL)")

        if not _has_index(insp, "students", "ix_students_institution_id"):
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_students_institution_id ON students (institution_id)"))
            report["schema_changes"].append("Created index ix_students_institution_id")

        # 2. Add institution_id column & FK to academicians
        if not _has_column(insp, "academicians", "institution_id"):
            if dialect == "postgresql":
                conn.execute(text(
                    "ALTER TABLE academicians "
                    "ADD COLUMN institution_id INTEGER NULL "
                    "REFERENCES institutions(id) ON DELETE SET NULL"
                ))
            else:
                conn.execute(text(
                    "ALTER TABLE academicians ADD COLUMN institution_id INTEGER NULL"
                ))
            report["schema_changes"].append("Added academicians.institution_id (FK -> institutions.id, ON DELETE SET NULL)")

        if not _has_index(insp, "academicians", "ix_academicians_institution_id"):
            conn.execute(text("CREATE INDEX IF NOT EXISTS ix_academicians_institution_id ON academicians (institution_id)"))
            report["schema_changes"].append("Created index ix_academicians_institution_id")

        # 3. Ensure tenant indexes on analytics and curriculum tables
        for tbl in ("student_skill_analytics", "placement_analytics", "curriculum_feedbacks"):
            idx_name = f"ix_{tbl}_institution_id"
            if not _has_index(insp, tbl, idx_name):
                conn.execute(text(f"CREATE INDEX IF NOT EXISTS {idx_name} ON {tbl} (institution_id)"))
                report["schema_changes"].append(f"Created index {idx_name}")

        # 4. Build unambiguous institution lookup map
        inst_rows = conn.execute(text("SELECT id, institution_name, institution_code FROM institutions")).mappings().all()
        name_counts: Dict[str, int] = {}
        name_to_id: Dict[str, int] = {}
        for row in inst_rows:
            norm_name = (row["institution_name"] or "").strip().lower()
            if norm_name:
                name_counts[norm_name] = name_counts.get(norm_name, 0) + 1
                name_to_id[norm_name] = row["id"]

        # Remove ambiguous names so we never assign to an incorrect institution
        safe_name_map = {k: v for k, v in name_to_id.items() if name_counts.get(k, 0) == 1}

        # 5. Migrate students safely
        student_rows = conn.execute(
            text("SELECT id, user_id, institution_name, institution_id FROM students WHERE institution_id IS NULL ORDER BY id")
        ).mappings().all()
        for s in student_rows:
            norm = (s["institution_name"] or "").strip().lower()
            matched_id = safe_name_map.get(norm)
            if matched_id is not None:
                conn.execute(
                    text("UPDATE students SET institution_id = :inst_id WHERE id = :sid"),
                    {"inst_id": matched_id, "sid": s["id"]},
                )
                report["migrated_students"] += 1
            else:
                report["unmapped_students"].append({
                    "student_id": s["id"],
                    "user_id": s["user_id"],
                    "institution_name": s["institution_name"],
                    "reason": "No exact unambiguous match in institutions table",
                })

        # 6. Migrate academicians safely
        acad_rows = conn.execute(
            text("SELECT id, user_id, institution_name, institution_id FROM academicians WHERE institution_id IS NULL ORDER BY id")
        ).mappings().all()
        for a in acad_rows:
            norm = (a["institution_name"] or "").strip().lower()
            matched_id = safe_name_map.get(norm)
            if matched_id is not None:
                conn.execute(
                    text("UPDATE academicians SET institution_id = :inst_id WHERE id = :aid"),
                    {"inst_id": matched_id, "aid": a["id"]},
                )
                report["migrated_academicians"] += 1
            else:
                report["unmapped_academicians"].append({
                    "academician_id": a["id"],
                    "user_id": a["user_id"],
                    "institution_name": a["institution_name"],
                    "reason": "No exact unambiguous match in institutions table",
                })

    return report
