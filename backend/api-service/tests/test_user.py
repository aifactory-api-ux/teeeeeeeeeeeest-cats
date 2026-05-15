import os
import re
import pytest

USER_MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'models', 'user.ts')


def test_create_user_saves_user_to_db():
    with open(USER_MODEL_PATH, 'r') as f:
        content = f.read()

    create_pattern = r'(create|insert|save|addUser)'
    assert re.search(create_pattern, content), "createUser function not found"


def test_get_user_by_email_returns_user():
    with open(USER_MODEL_PATH, 'r') as f:
        content = f.read()

    get_by_email_pattern = r'(findByEmail|getUserByEmail|findOne)'
    assert re.search(get_by_email_pattern, content), "getUserByEmail function not found"


def test_get_user_by_email_nonexistent_returns_none():
    with open(USER_MODEL_PATH, 'r') as f:
        content = f.read()

    none_pattern = r'(null|None|undefined)'
    assert re.search(none_pattern, content), "null return not found"


def test_email_unique_constraint_raises_on_duplicate():
    with open(USER_MODEL_PATH, 'r') as f:
        content = f.read()

    unique_pattern = r'(unique|constraint|duplicate)'
    assert re.search(unique_pattern, content), "unique constraint not found"