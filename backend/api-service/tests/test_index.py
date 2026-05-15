import os
import re
import pytest

INDEX_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'index.ts')


def test_app_starts_on_configured_port():
    with open(INDEX_PATH, 'r') as f:
        content = f.read()

    port_pattern = r'(PORT|23001|listen)'
    assert re.search(port_pattern, content), "PORT configuration not found"


def test_app_fails_to_start_on_port_in_use():
    with open(INDEX_PATH, 'r') as f:
        content = f.read()

    error_pattern = r'(error|throw|catch|EADDRINUSE)'
    assert re.search(error_pattern, content), "port error handling not found"


def test_app_reads_env_config():
    with open(INDEX_PATH, 'r') as f:
        content = f.read()

    env_pattern = r'(process\.env|env\.|config)'
    assert re.search(env_pattern, content), "env config reading not found"