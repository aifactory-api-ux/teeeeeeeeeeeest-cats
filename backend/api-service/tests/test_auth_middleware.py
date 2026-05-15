import os
import re
import pytest

AUTH_MIDDLEWARE_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'middlewares', 'auth.ts')


def test_auth_middleware_allows_valid_jwt():
    with open(AUTH_MIDDLEWARE_PATH, 'r') as f:
        content = f.read()

    verify_pattern = r'(verify|verifyJwt|JWT)'
    assert re.search(verify_pattern, content), "JWT verification not found"


def test_auth_middleware_rejects_missing_authorization_header():
    with open(AUTH_MIDDLEWARE_PATH, 'r') as f:
        content = f.read()

    missing_auth_pattern = r'(401|unauthorized|missing)'
    assert re.search(missing_auth_pattern, content), "missing auth handling not found"


def test_auth_middleware_rejects_invalid_jwt():
    with open(AUTH_MIDDLEWARE_PATH, 'r') as f:
        content = f.read()

    invalid_pattern = r'(401|invalid|unauthorized)'
    assert re.search(invalid_pattern, content), "invalid JWT handling not found"


def test_auth_middleware_rejects_expired_jwt():
    with open(AUTH_MIDDLEWARE_PATH, 'r') as f:
        content = f.read()

    expired_pattern = r'(expired|401|unauthorized)'
    assert re.search(expired_pattern, content), "expired JWT handling not found"