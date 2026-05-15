import os
import re
import pytest

SWAGGER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'swagger', 'swagger.ts')


def test_swagger_ui_route_serves_html():
    with open(SWAGGER_PATH, 'r') as f:
        content = f.read()

    html_pattern = r'(swagger-ui|swaggerUi|swaggerUi\.serve)'
    assert re.search(html_pattern, content), "swagger-ui configuration not found"


def test_swagger_json_route_serves_openapi():
    with open(SWAGGER_PATH, 'r') as f:
        content = f.read()

    openapi_pattern = r'(openapi|openapi\.json|json)'
    assert re.search(openapi_pattern, content), "OpenAPI JSON not found"


def test_swagger_docs_include_all_paths():
    with open(SWAGGER_PATH, 'r') as f:
        content = f.read()

    paths = ['/api/products', '/api/auth', '/api/cart', '/api/orders']
    for path in paths:
        assert path in content, f"Path {path} not found in swagger"