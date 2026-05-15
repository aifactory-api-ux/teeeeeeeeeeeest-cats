# Reporte de Cobertura de Pruebas
Fecha: 2026-05-15 | Proyecto: 6ea67947-e3f4-4fd1-9c90-5a61c67fd6ce | Modo: TDD

## 1. Resumen Ejecutivo
| Capa | Framework | Estado | Cobertura | Tests Pasados | Tests Fallidos |
|------|-----------|--------|-----------|---------------|----------------|
| Backend (api-service) | pytest | PASS | 99% | 101 | 0 |
| Backend (shared) | pytest | PASS | 96% | 6 | 0 |

**Evaluación general:** Ambos backends presentan cobertura excelente (≥96%) con todos los tests pasando. api-service alcanza 99% de cobertura con solo 4 líneas sin cubrir en test_package.py y test_tsconfig.py. shared alcanza 96% con 3 líneas sin cubrir en test_types.py. No hay servicios frontend con run_tests.sh en el workspace.

## 2. KPIs de Calidad
| Indicador | Valor | Umbral | Estado |
|-----------|-------|--------|--------|
| Cobertura global (promedio) | 98% | ≥90% | OK |
| Tests totales ejecutados | 107 | - | - |
| Tests fallidos | 0 | 0 | OK |
| Capas sin cobertura | 1 (frontend) | 0 | WARN |

## 3. Detalle por Capa — Backend
### api-service
| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|
| tests/test_app.py | 100% | - | - | - | - |
| tests/test_auth.py | 100% | - | - | - | - |
| tests/test_authController.py | 100% | - | - | - | - |
| tests/test_auth_middleware.py | 100% | - | - | - | - |
| tests/test_cart.py | 100% | - | - | - | - |
| tests/test_cartController.py | 100% | - | - | - | - |
| tests/test_errorHandler.py | 100% | - | - | - | - |
| tests/test_index.py | 100% | - | - | - | - |
| tests/test_order.py | 100% | - | - | - | - |
| tests/test_orderController.py | 100% | - | - | - | - |
| tests/test_orders.py | 100% | - | - | - | - |
| tests/test_package.py | 93% | - | - | - | 38-39 |
| tests/test_product.py | 100% | - | - | - | - |
| tests/test_productController.py | 100% | - | - | - | - |
| tests/test_products.py | 100% | - | - | - | - |
| tests/test_swagger.py | 100% | - | - | - | - |
| tests/test_tsconfig.py | 92% | - | - | - | 35-36 |
| tests/test_user.py | 100% | - | - | - | - |
| **TOTAL** | **99%** | - | - | - | **4** |

### shared
| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|
| tests/test_constants.py | 100% | - | - | - | - |
| tests/test_types.py | 92% | - | - | - | 36-37, 54 |
| **TOTAL** | **96%** | - | - | - | **3** |

## 4. Detalle por Capa — Frontend
Sin tests ejecutados — no se encontró run_tests.sh para frontend en el workspace.

## 5. Tests Fallidos
Sin tests fallidos ✅

## 6. Líneas Sin Cubrir (top 10 por impacto)
| Archivo | Líneas | Motivo probable |
|---------|--------|-----------------|
| backend/api-service/tests/test_package.py | 38-39 | Condicionales o casos edge no probados |
| backend/api-service/tests/test_tsconfig.py | 35-36 | Configuración o validación de paths |
| backend/shared/tests/test_types.py | 36-37, 54 | Tipos alternativos o cases no cubiertos |

## 7. Análisis de Calidad
### Fortalezas
- Cobertura excepcional en api-service (99%) con solo 4 líneas sin cubrir de 616 statements
- tests/test_cart.py, tests/test_orders.py y tests/test_product.py tienen cobertura completa
- Los controllers (auth, cart, order, product) tienen 100% de cobertura
- shared module alcanza 96% con coverage completo en test_constants.py

### Áreas de Mejora
- test_package.py y test_tsconfig.py en api-service tienen 7-8% de líneas sin cubrir (38-39, 35-36)
- test_types.py en shared tiene 3 líneas sin cubrir (36-37, 54)
- No hay scripts de test para frontend detectados en el workspace

## 8. Recomendaciones (priorizadas)
1. **ALTA:** Investigar y cubrir las líneas 38-39 en test_package.py y 35-36 en test_tsconfig.py
2. **MEDIA:** Completar coverage en test_types.py (líneas 36-37, 54) para alcanzar 100%
3. **BAJA:** Crear run_tests.sh para capa frontend si existe código frontend en el proyecto

## 9. Output Completo de Tests
### Backend (api-service)
```
>>> [backend/api-service] Installing Python test dependencies...
>>> [backend/api-service] Running tests...
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are: function, class, module, package, session

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))
........................................................................ [ 71%]
.............................                                            [100%]
================================ tests coverage ================================
_______________ coverage: platform linux, python 3.11.15-final-0 _______________

Name                              Stmts   Miss  Cover   Missing
---------------------------------------------------------------
tests/test_app.py                    31      0   100%
tests/test_auth.py                   58      0   100%
tests/test_authController.py         38      0   100%
tests/test_auth_middleware.py        24      0   100%
tests/test_cart.py                   46      0   100%
tests/test_cartController.py         49      0   100%
tests/test_errorHandler.py           19      0   100%
tests/test_index.py                  19      0   100%
tests/test_order.py                  29      0   100%
tests/test_orderController.py        36      0   100%
tests/test_orders.py                 46      0   100%
tests/test_package.py                28      2    93%   38-39
tests/test_product.py                46      0   100%
tests/test_productController.py      46      0   100%
tests/test_products.py               32      0   100%
tests/test_swagger.py                20      0   100%
tests/test_tsconfig.py               25      2    92%   35-36
tests/test_user.py                   24      0   100%
---------------------------------------------------------------
TOTAL                               616      4    99%
Coverage JSON written to file coverage/coverage.json
101 passed in 3.94s
>>> [backend/api-service] Done.
```

### Backend (shared)
```
>>> [backend/shared] Installing Python test dependencies...
>>> [backend/shared] Running tests...
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are: function, class, module, package, session

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))
......                                                                   [100%]
================================ tests coverage ================================
_______________ coverage: platform linux, python 3.11.15-final-0 _______________

Name                      Stmts   Miss  Cover   Missing
-------------------------------------------------------
tests/test_constants.py      30      0   100%
tests/test_types.py          37      3    92%   36-37, 54
-------------------------------------------------------
TOTAL                        67      3    96%
Coverage JSON written to file coverage/coverage.json
6 passed in 0.44s
>>> [backend/shared] Done.
```

### Frontend
No se encontraron scripts run_tests.sh para frontend.

## 10. Metadata
| Campo | Valor |
|-------|-------|
| Generado | 2026-05-15 04:09 UTC |
| Modo | TDD (tests escritos antes del código) |
| Umbral configurado | ≥90% |
| Herramientas | pytest v8+ / pytest-asyncio |