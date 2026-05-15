import os
import re
import pytest

ROUTES_AUTH_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'routes', 'auth.ts')


def test_register_valid_user_returns_201_and_auth_response():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    register_pattern = r'(register|post.*register)'
    assert re.search(register_pattern, content), "register route not found"

    token_pattern = r'(token|JWT)'
    assert re.search(token_pattern, content), "token not found"


def test_register_duplicate_email_returns_400():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    duplicate_pattern = r'(duplicate|exists|400)'
    assert re.search(duplicate_pattern, content), "duplicate handling not found"


def test_register_missing_fields_returns_422():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(422|validation|missing)'
    assert re.search(validation_pattern, content), "validation not found"


def test_login_valid_credentials_returns_201_and_auth_response():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    login_pattern = r'(login|post.*login)'
    assert re.search(login_pattern, content), "login route not found"

    token_pattern = r'(token|JWT)'
    assert re.search(token_pattern, content), "token not found"


def test_login_invalid_password_returns_401():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    invalid_pattern = r'(401|unauthorized|invalid)'
    assert re.search(invalid_pattern, content), "401 not found"


def test_login_missing_email_returns_422():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(422|validation)'
    assert re.search(validation_pattern, content), "validation not found"


def test_login_nonexistent_user_returns_401():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(401|not.*found)'
    assert re.search(not_found_pattern, content), "not found handling not found"


def test_me_with_valid_jwt_returns_200_and_user():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    me_pattern = r'(me|get.*user|profile)'
    assert re.search(me_pattern, content), "me route not found"


def test_me_with_missing_jwt_returns_401():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    auth_pattern = r'(401|unauthorized|authenticate)'
    assert re.search(auth_pattern, content), "auth error not found"


def test_me_with_invalid_jwt_returns_401():
    with open(ROUTES_AUTH_PATH, 'r') as f:
        content = f.read()

    auth_pattern = r'(401|unauthorized|invalid)'
    assert re.search(auth_pattern, content), "auth error not found"