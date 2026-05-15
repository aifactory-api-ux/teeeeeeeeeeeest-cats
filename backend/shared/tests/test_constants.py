import os
import re
import pytest

SHARED_CONSTANTS_PATH = os.path.join(os.path.dirname(__file__), '..', 'constants.ts')


def test_order_status_constants_match_spec():
    with open(SHARED_CONSTANTS_PATH, 'r') as f:
        content = f.read()

    order_statuses_match = re.search(r'ORDER_STATUSES\s*=\s*\[([^\]]+)\]', content)
    assert order_statuses_match, "ORDER_STATUSES constant not found"

    values_str = order_statuses_match.group(1)
    values = re.findall(r'[\'"]([^\'"]+)[\'"]', values_str)

    expected = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
    assert values == expected, f"Expected {expected}, got {values}"


def test_user_roles_constant_includes_admin_and_user():
    with open(SHARED_CONSTANTS_PATH, 'r') as f:
        content = f.read()

    user_roles_match = re.search(r'USER_ROLES\s*=\s*\[([^\]]+)\]', content)
    assert user_roles_match, "USER_ROLES constant not found"

    values_str = user_roles_match.group(1)
    values = re.findall(r'[\'"]([^\'"]+)[\'"]', values_str)

    assert 'admin' in values, "admin not found in USER_ROLES"
    assert 'user' in values, "user not found in USER_ROLES"


def test_categories_constant_is_not_empty():
    with open(SHARED_CONSTANTS_PATH, 'r') as f:
        content = f.read()

    categories_match = re.search(r'CATEGORIES\s*=\s*\[([^\]]+)\]', content)
    assert categories_match, "CATEGORIES constant not found"

    values_str = categories_match.group(1)
    values = re.findall(r'[\'"]([^\'"]+)[\'"]', values_str)

    assert len(values) > 0, "CATEGORIES is empty"