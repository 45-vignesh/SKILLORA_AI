import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"

def init_postgres(password: str, host: str = "localhost", port: int = 5432, user: str = "postgres", dbname: str = "skillora"):
    print(f"[*] Connecting to PostgreSQL at {host}:{port} as user '{user}'...")
    try:
        # 1. Connect to default postgres DB
        conn = psycopg2.connect(
            dbname="postgres",
            user=user,
            password=password,
            host=host,
            port=port
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()

        # 2. Check if skillora database exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (dbname,))
        exists = cur.fetchone()
        if not exists:
            print(f"[*] Database '{dbname}' not found. Creating database '{dbname}'...")
            cur.execute(f'CREATE DATABASE "{dbname}"')
            print(f"[+] Database '{dbname}' created successfully!")
        else:
            print(f"[+] Database '{dbname}' already exists.")

        cur.close()
        conn.close()

        # 3. Configure backend/.env
        db_url = f"postgresql://{user}:{password}@{host}:{port}/{dbname}"
        
        env_lines = []
        if ENV_FILE.exists():
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                env_lines = [l for l in f.readlines() if not l.startswith("DATABASE_URL=")]
        
        env_lines.append(f"DATABASE_URL={db_url}\n")
        
        with open(ENV_FILE, "w", encoding="utf-8") as f:
            f.writelines(env_lines)
            
        print(f"[+] Updated {ENV_FILE} with DATABASE_URL.")

        # 4. Initialize tables using SQLAlchemy
        os.environ["DATABASE_URL"] = db_url
        print("[*] Initializing SQLAlchemy tables in PostgreSQL...")
        from backend.database.connection import get_engine, Base
        import backend.models  # load models
        
        pg_engine = get_engine()
        Base.metadata.create_all(bind=pg_engine)
        print("[+] All PostgreSQL database tables created successfully!")

        # 5. Populate initial seed data
        print("[*] Seeding database with real initial data (jobs, courses, assessments)...")
        from backend.seed import seed_database
        seed_database()
        print("[+] Database seeding complete!")
        print(f"\n🎉 Skillora AI is now connected to PostgreSQL: {dbname}!")
        return True

    except Exception as e:
        print(f"[!] PostgreSQL configuration error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pwd = sys.argv[1]
    else:
        pwd = input("Enter PostgreSQL password for user 'postgres': ").strip()
    
    init_postgres(pwd)
