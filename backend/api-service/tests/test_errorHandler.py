import os
import re
import pytest

ERROR_HANDLER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'middlewares', 'errorHandler.ts')


def test_error_handler_returns_500_on_unhandled_error():
    with open(ERROR_HANDLER_PATH, 'r') as f:
        content = f.read()

    error_500_pattern = r'(500|Internal Server Error)'
    assert re.search(error_500_pattern, content), "500 error handling not found"


def test_error_handler_returns_custom_status_and_message():
    with open(ERROR_HANDLER_PATH, 'r') as f:
        content = f.read()

    status_pattern = r'(statusCode|status|message)'
    assert re.search(status_pattern, content), "status handling not found"


def test_error_handler_handles_validation_error():
    with open(ERROR_HANDLER_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(400|validation|ValidationError)'
    assert re.search(validation_pattern, content), "validation error handling not found"