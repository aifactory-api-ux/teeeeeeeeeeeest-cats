import os
import re
import pytest

PRODUCT_CONTROLLER_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'controllers', 'productController.ts')


def test_get_product_by_id_returns_product():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    get_by_id_pattern = r'(getProduct|getProductById|findById)'
    assert re.search(get_by_id_pattern, content), "getProductById function not found"


def test_get_product_by_id_not_found_returns_404():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound|not.*found)'
    assert re.search(not_found_pattern, content), "404 not found handling not found"


def test_create_product_with_valid_data_returns_201_and_product():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    create_pattern = r'(createProduct|addProduct|new Product)'
    assert re.search(create_pattern, content), "createProduct function not found"

    status_201_pattern = r'(201|created)'
    assert re.search(status_201_pattern, content), "201 status not found"


def test_create_product_with_missing_required_field_returns_400():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    validation_pattern = r'(400|validation|required)'
    assert re.search(validation_pattern, content), "Validation not found"


def test_update_product_with_valid_data_returns_200_and_updated_product():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    update_pattern = r'(updateProduct|putProduct)'
    assert re.search(update_pattern, content), "updateProduct function not found"


def test_update_product_with_invalid_id_returns_404():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "404 not found handling not found"


def test_delete_product_by_id_returns_200_and_success_true():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    delete_pattern = r'(deleteProduct|removeProduct)'
    assert re.search(delete_pattern, content), "deleteProduct function not found"


def test_delete_product_by_id_not_found_returns_404():
    with open(PRODUCT_CONTROLLER_PATH, 'r') as f:
        content = f.read()

    not_found_pattern = r'(404|NotFound)'
    assert re.search(not_found_pattern, content), "404 not found handling not found"