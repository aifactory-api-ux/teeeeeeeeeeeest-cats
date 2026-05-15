import os
import re
import pytest

def test_constants_file_is_identical_to_shared_constants():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'constants.ts')
    shared_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'shared', 'constants.ts'))

    assert os.path.exists(src_path), f"src/shared/constants.ts not found at {src_path}"
    assert os.path.exists(shared_path), f"shared/constants.ts not found at {shared_path}"

    with open(src_path, 'r') as f:
        src_content = f.read()
    with open(shared_path, 'r') as f:
        shared_content = f.read()

    assert src_content == shared_content, "src/shared/constants.ts is not identical to shared/constants.ts"


def test_constants_file_exports_all_constants():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'constants.ts')

    with open(src_path, 'r') as f:
        content = f.read()

    expected_exports = ['ORDER_STATUSES', 'USER_ROLES', 'CATEGORIES']

    for const_name in expected_exports:
        pattern = rf'export\s+const\s+{const_name}\s*='
        assert pattern in content, f"Constant {const_name} not exported"


def test_constants_file_no_extra_exports():
    src_path = os.path.join(os.path.dirname(__file__), '..', '..', 'shared', 'constants.ts')

    with open(src_path, 'r') as f:
        content = f.read()

    expected_exports = ['ORDER_STATUSES', 'USER_ROLES', 'CATEGORIES']

    all_consts = set()
    for match in re.findall(r'export\s+const\s+(\w+)\s*=', content):
        all_consts.add(match)

    extra = all_consts - set(expected_exports)
    assert len(extra) == 0, f"Extra exports found: {extra}"