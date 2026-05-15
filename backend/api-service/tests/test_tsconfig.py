import os
import json
import pytest

TSCONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', 'tsconfig.json')


def test_tsconfig_strict_mode_enabled():
    with open(TSCONFIG_PATH, 'r') as f:
        content = f.read()

    data = json.loads(content)
    strict = data.get('compilerOptions', {}).get('strict')

    assert strict is True, "strict mode not enabled"


def test_tsconfig_target_esnext():
    with open(TSCONFIG_PATH, 'r') as f:
        content = f.read()

    data = json.loads(content)
    target = data.get('compilerOptions', {}).get('target')

    assert target in ['ESNext', 'ES2022'], f"target should be ESNext or ES2022, got {target}"


def test_tsconfig_json_valid():
    with open(TSCONFIG_PATH, 'r') as f:
        content = f.read()

    try:
        json.loads(content)
        valid = True
    except json.JSONDecodeError:
        valid = False

    assert valid, "tsconfig.json is not valid JSON"