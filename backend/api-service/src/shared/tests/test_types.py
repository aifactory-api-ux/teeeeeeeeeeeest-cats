import os
import filecmp
import pytest

def test_types_file_is_identical_to_shared_types():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'types.ts')
    shared_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'shared', 'types.ts')
    shared_path = os.path.normpath(shared_path)

    assert os.path.exists(src_path), f"src/shared/types.ts not found at {src_path}"
    assert os.path.exists(shared_path), f"shared/types.ts not found at {shared_path}"

    with open(src_path, 'r') as f:
        src_content = f.read()
    with open(shared_path, 'r') as f:
        shared_content = f.read()

    assert src_content == shared_content, "src/shared/types.ts is not identical to shared/types.ts"


def test_types_file_exports_all_interfaces():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'types.ts')

    with open(src_path, 'r') as f:
        content = f.read()

    expected_exports = ['Product', 'ProductCreate', 'User', 'UserRegister', 'UserLogin', 'AuthResponse', 'Cart', 'CartItem', 'Order']

    for export_name in expected_exports:
        pattern = rf'export\s+interface\s+{export_name}\s*\{{'
        assert pattern in content, f"Interface {export_name} not exported"


def test_types_file_no_extra_exports():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'types.ts')

    with open(src_path, 'r') as f:
        content = f.read()

    expected_exports = ['Product', 'ProductCreate', 'User', 'UserRegister', 'UserLogin', 'AuthResponse', 'Cart', 'CartItem', 'Order']

    all_interfaces = set()
    for match in __import__('re').findall(r'export\s+interface\s+(\w+)\s*\{', content):
        all_interfaces.add(match)

    extra = all_interfaces - set(expected_exports)
    assert len(extra) == 0, f"Extra exports found: {extra}"