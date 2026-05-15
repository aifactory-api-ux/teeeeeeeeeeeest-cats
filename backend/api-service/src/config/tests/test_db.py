import os
import re
import pytest

CONFIG_DB_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'config', 'db.ts')


def test_postgres_connection_config_valid():
    with open(CONFIG_DB_PATH, 'r') as f:
        content = f.read()

    assert 'postgresql://' in content or 'postgres://' in content, "PostgreSQL connection string pattern not found"

    host_pattern = r'POSTGRES_HOST'
    port_pattern = r'POSTGRES_PORT'
    user_pattern = r'POSTGRES_USER'
    password_pattern = r'POSTGRES_PASSWORD'
    db_pattern = r'POSTGRES_DB'

    assert re.search(host_pattern, content), "POSTGRES_HOST not found"
    assert re.search(port_pattern, content), "POSTGRES_PORT not found"
    assert re.search(user_pattern, content), "POSTGRES_USER not found"
    assert re.search(password_pattern, content), "POSTGRES_PASSWORD not found"
    assert re.search(db_pattern, content), "POSTGRES_DB not found"


def test_missing_postgres_env_variable_raises_error():
    with open(CONFIG_DB_PATH, 'r') as f:
        content = f.read()

    user_check_pattern = r'(if\s*\(!.*POSTGRES_USER|throw.*POSTGRES_USER)'
    assert re.search(user_check_pattern, content), "POSTGRES_USER missing check not found"


def test_invalid_postgres_port_raises_error():
    with open(CONFIG_DB_PATH, 'r') as f:
        content = f.read()

    port_validation_pattern = r'(POSTGRES_PORT.*isNaN|isNaN.*POSTGRES_PORT|parseInt.*POSTGRES_PORT)'
    assert re.search(port_validation_pattern, content), "POSTGRES_PORT validation not found"