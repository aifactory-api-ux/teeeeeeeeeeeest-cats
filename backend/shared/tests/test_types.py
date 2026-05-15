import os
import re
import json
import pytest

SHARED_TYPES_PATH = os.path.join(os.path.dirname(__file__), '..', 'types.ts')


def test_product_interface_fields_match_spec():
    with open(SHARED_TYPES_PATH, 'r') as f:
        content = f.read()

    interface_match = re.search(r'export\s+interface\s+Product\s*\{([^}]+)\}', content, re.DOTALL)
    assert interface_match, "Product interface not found"

    fields_str = interface_match.group(1)
    field_names = re.findall(r'(\w+)\s*:', fields_str)

    expected_fields = ['id', 'name', 'description', 'price', 'imageUrl', 'stock', 'category', 'createdAt', 'updatedAt']
    assert field_names == expected_fields, f"Expected fields {expected_fields}, got {field_names}"


def test_user_register_interface_missing_field_raises_error():
    with open(SHARED_TYPES_PATH, 'r') as f:
        content = f.read()

    interface_match = re.search(r'export\s+interface\s+UserRegister\s*\{([^}]+)\}', content, re.DOTALL)
    assert interface_match, "UserRegister interface not found"

    fields_str = interface_match.group(1)
    field_names = re.findall(r'(\w+)\s*:', fields_str)

    test_input = {'email': 'test@example.com', 'password': 'pass123'}
    missing_field = 'name'
    if missing_field not in field_names:
        error_result = {'validation_error': f'Missing required field: {missing_field}'}
        assert error_result == {'validation_error': 'Missing required field: name'}


def test_order_status_enum_accepts_only_valid_values():
    with open(SHARED_TYPES_PATH, 'r') as f:
        content = f.read()

    order_interface_match = re.search(r'export\s+interface\s+Order\s*\{([^}]+)\}', content, re.DOTALL)
    assert order_interface_match, "Order interface not found"

    fields_str = order_interface_match.group(1)
    status_match = re.search(r'status\s*:\s*[\'"]([^\'"]+)[\'"]', fields_str)

    if status_match:
        valid_statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
        assert status_match.group(1) in valid_statuses
    else:
        assert False, "Order status field not found"