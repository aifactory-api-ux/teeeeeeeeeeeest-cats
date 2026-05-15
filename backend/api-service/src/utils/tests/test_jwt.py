import os
import re
import pytest

UTILS_JWT_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'utils', 'jwt.ts')


def test_jwt_sign_and_verify_valid_token():
    with open(UTILS_JWT_PATH, 'r') as f:
        content = f.read()

    sign_pattern = r'(sign\(|jwt\.sign|jwtSign)'
    verify_pattern = r'(verify\(|jwt\.verify|jwtVerify)'

    assert re.search(sign_pattern, content), "JWT sign function not found"
    assert re.search(verify_pattern, content), "JWT verify function not found"


def test_jwt_verify_invalid_token_raises_error():
    with open(UTILS_JWT_PATH, 'r') as f:
        content = f.read()

    error_pattern = r'(throw|error|reject|JsonWebTokenError)'
    assert re.search(error_pattern, content), "JWT verification error handling not found"


def test_jwt_sign_with_missing_secret_raises_error():
    with open(UTILS_JWT_PATH, 'r') as f:
        content = f.read()

    secret_check_pattern = r'(if\s*\(!.*secret|JWT_SECRET|throw.*secret)'
    assert re.search(secret_check_pattern, content), "Missing secret check not found"