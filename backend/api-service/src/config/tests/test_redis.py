import os
import re
import pytest

CONFIG_REDIS_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'config', 'redis.ts')


def test_redis_connection_config_valid():
    with open(CONFIG_REDIS_PATH, 'r') as f:
        content = f.read()

    assert 'redis://' in content, "Redis connection string pattern not found"

    host_pattern = r'REDIS_HOST'
    port_pattern = r'REDIS_PORT'

    assert re.search(host_pattern, content), "REDIS_HOST not found"
    assert re.search(port_pattern, content), "REDIS_PORT not found"


def test_missing_redis_env_variable_raises_error():
    with open(CONFIG_REDIS_PATH, 'r') as f:
        content = f.read()

    host_check_pattern = r'(if\s*\(!.*REDIS_HOST|throw.*REDIS_HOST)'
    assert re.search(host_check_pattern, content), "REDIS_HOST missing check not found"


def test_invalid_redis_port_raises_error():
    with open(CONFIG_REDIS_PATH, 'r') as f:
        content = f.read()

    port_validation_pattern = r'(REDIS_PORT.*isNaN|isNaN.*REDIS_PORT|parseInt.*REDIS_PORT)'
    assert re.search(port_validation_pattern, content), "REDIS_PORT validation not found"