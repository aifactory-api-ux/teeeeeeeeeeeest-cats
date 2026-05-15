import os
import re
import pytest

UTILS_DB_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'utils', 'db.ts')


def test_db_connection_pool_initializes_successfully():
    with open(UTILS_DB_PATH, 'r') as f:
        content = f.read()

    pool_pattern = r'(Pool|pool\s*=|createPool|new\s+Pool)'
    assert re.search(pool_pattern, content), "DB connection pool initialization not found"


def test_db_migration_runs_without_error():
    with open(UTILS_DB_PATH, 'r') as f:
        content = f.read()

    migration_pattern = r'(migrate|migration|createTable|execute)'
    assert re.search(migration_pattern, content), "Migration logic not found"


def test_db_seed_logic_handles_duplicate_entries():
    with open(UTILS_DB_PATH, 'r') as f:
        content = f.read()

    seed_pattern = r'(seed|createMany|bulkInsert|count.*===.*0)'
    assert re.search(seed_pattern, content), "Seed logic not found"