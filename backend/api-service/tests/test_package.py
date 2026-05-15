import os
import json
import pytest

PACKAGE_JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'package.json')


def test_required_dependencies_present():
    with open(PACKAGE_JSON_PATH, 'r') as f:
        content = f.read()

    data = json.loads(content)
    deps = data.get('dependencies', {})

    required = ['express', 'swagger-jsdoc', 'swagger-ui-express', 'pg', 'redis', 'jsonwebtoken']
    for dep in required:
        assert dep in deps, f"Dependency {dep} not found"


def test_scripts_include_start_and_dev():
    with open(PACKAGE_JSON_PATH, 'r') as f:
        content = f.read()

    data = json.loads(content)
    scripts = data.get('scripts', {})

    assert 'start' in scripts, "'start' script not found"
    assert 'dev' in scripts, "'dev' script not found"


def test_package_json_valid_json():
    with open(PACKAGE_JSON_PATH, 'r') as f:
        content = f.read()

    try:
        json.loads(content)
        valid = True
    except json.JSONDecodeError:
        valid = False

    assert valid, "package.json is not valid JSON"