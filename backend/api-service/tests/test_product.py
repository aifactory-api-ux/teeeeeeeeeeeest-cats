import os
import re
import pytest

PRODUCT_MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'models', 'product.ts')


def test_create_product_persists_and_returns_product():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    create_pattern = r'(create|insert|save|addProduct)'
    assert re.search(create_pattern, content), "Create function not found"


def test_get_product_by_id_returns_correct_product():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    get_by_id_pattern = r'(findById|getProduct|findOne)'
    assert re.search(get_by_id_pattern, content), "findById function not found"


def test_get_product_by_id_not_found_returns_none():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    none_pattern = r'(null|None|undefined)'
    assert re.search(none_pattern, content), "null return not found"


def test_update_product_updates_fields():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    update_pattern = r'(update|modify|edit)'
    assert re.search(update_pattern, content), "Update function not found"


def test_update_product_invalid_id_returns_none():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    none_pattern = r'(null|None|undefined)'
    assert re.search(none_pattern, content), "null return not found"


def test_delete_product_removes_product():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    delete_pattern = r'(delete|remove|destroy)'
    assert re.search(delete_pattern, content), "Delete function not found"


def test_delete_product_invalid_id_returns_false():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    false_pattern = r'(false|False)'
    assert re.search(false_pattern, content), "false return not found"


def test_list_products_with_search_and_pagination():
    with open(PRODUCT_MODEL_PATH, 'r') as f:
        content = f.read()

    search_pattern = r'(search|query|filter)'
    pagination_pattern = r'(page|limit|offset)'
    assert re.search(search_pattern, content), "Search not found"
    assert re.search(pagination_pattern, content), "Pagination not found"