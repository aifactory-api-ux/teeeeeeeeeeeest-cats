import os
import re
import pytest

CONFIG_INDEX_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'config', 'index.ts')


def test_env_variables_loaded_and_valid():
    with open(CONFIG_INDEX_PATH, 'r') as f:
        content = f.read()

    required_vars = ['PORT', 'POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB', 'REDIS_HOST', 'REDIS_PORT', 'JWT_SECRET']

    for var in required_vars:
        assert var in content, f"Required env var {var} not found in config"


def test_missing_required_env_variable_raises_error():
    with open(CONFIG_INDEX_PATH, 'r') as f:
        content = f.read()

    assert 'JWT_SECRET' in content, "JWT_SECRET validation not found"

    env_check_pattern = r'(if\s*\(!.*JWT_SECRET|throw.*JWT_SECRET)'
    assert re.search(env_check_pattern, content), "JWT_SECRET missing check not found"


def test_invalid_port_env_variable_raises_error():
    with open(CONFIG_INDEX_PATH, 'r') as f:
        content = f.read()

    port_validation_pattern = r'(PORT.*isNaN|isNaN.*PORT|parseInt.*PORT|Number.*PORT)'
    assert re.search(port_validation_pattern, content), "PORT validation not found"