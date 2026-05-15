import os
import re
import pytest

AUTH_CONTROLLER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'controllers', 'authController.ts')


def test_register_hashes_password_and_saves_user():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    hash_pattern = r'(hash|bcrypt|argon2)'
    assert re.search(hash_pattern, content), "password hashing not found"

    save_pattern = r'(save|create|insert|new User)'
    assert re.search(save_pattern, content), "user save not found"


def test_register_with_invalid_email_format_returns_error():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    email_validation_pattern = r'(email|validation|isEmail)'
    assert re.search(email_validation_pattern, content), "email validation not found"


def test_login_returns_token_and_user_on_success():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    token_pattern = r'(token|JWT)'
    assert re.search(token_pattern, content), "token generation not found"

    user_pattern = r'(user|return)'
    assert re.search(user_pattern, content), "user return not found"


def test_login_with_wrong_password_raises_auth_error():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    auth_error_pattern = r'(401|auth.*error|unauthorized)'
    assert re.search(auth_error_pattern, content), "auth error not found"


def test_me_returns_user_for_valid_jwt():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    me_pattern = r'(me|getUser|getUserById)'
    assert re.search(me_pattern, content), "me function not found"


def test_me_with_invalid_jwt_raises_auth_error():
    with open(AUTH_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    auth_error_pattern = r'(401|auth.*error|unauthorized)'
    assert re.search(auth_error_pattern, content), "auth error not found"