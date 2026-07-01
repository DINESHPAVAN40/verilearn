import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import app


def test_app_imports():
    assert app.app is not None


def test_main_routes_exist():
    routes = [rule.rule for rule in app.app.url_map.iter_rules()]
    assert '/' in routes
    assert '/login' in routes
    assert '/register' in routes
    assert '/workspace' in routes
    assert '/api/compile' in routes
    assert '/api/projects' in routes
