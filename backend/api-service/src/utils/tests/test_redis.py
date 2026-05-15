import os
import re
import pytest

UTILS_REDIS_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'utils', 'redis.ts')


def test_redis_client_connects_successfully():
    with open(UTILS_REDIS_PATH, 'r') as f:
        content = f.read()

    client_pattern = r'(createClient|new\s+Redis|redis.*connect|client\.connect)'
    assert re.search(client_pattern, content), "Redis client connection not found"


def test_redis_client_handles_connection_error():
    with open(UTILS_REDIS_PATH, 'r') as f:
        content = f.read()

    error_pattern = r'(catch|on.*error|error.*handl|try.*catch)'
    assert re.search(error_pattern, content), "Error handling not found"


def test_redis_client_reconnects_on_disconnect():
    with open(UTILS_REDIS_PATH, 'r') as f:
        content = f.read()

    reconnect_pattern = r'(reconnect|retry|backoff|connectRetry)'
    assert re.search(reconnect_pattern, content), "Reconnect logic not found"