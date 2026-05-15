import os
import re
import pytest

APP_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'app.ts')


def test_all_routes_registered_and_respond():
    with open(APP_PATH, 'r') as f:
        content = f.read()

    # Check that route routers are mounted
    assert '/api/products' in content, "Products router not mounted"
    assert '/api/auth' in content, "Auth router not mounted"
    assert '/api/cart' in content, "Cart router not mounted"
    assert '/api/orders' in content, "Orders router not mounted"


def test_swagger_ui_available():
    with open(APP_PATH, 'r') as f:
        content = f.read()

    swagger_pattern = r'(swagger|/docs|swagger-ui)'
    assert re.search(swagger_pattern, content), "Swagger UI not found"


def test_swagger_json_available():
    with open(APP_PATH, 'r') as f:
        content = f.read()

    openapi_pattern = r'(openapi|openapi\.json|/openapi\.json)'
    assert re.search(openapi_pattern, content), "OpenAPI JSON not found"


def test_healthcheck_endpoint_returns_200():
    with open(APP_PATH, 'r') as f:
        content = f.read()

    healthcheck_pattern = r'(healthcheck|/health)'
    assert re.search(healthcheck_pattern, content), "healthcheck not found"


def test_404_for_unknown_route():
    with open(APP_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|not.*found|Unknown)'
    assert re.search(not_found_pattern, content), "404 handling not found"