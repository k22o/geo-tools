# テスト名がtestで始まるものが対象
PYTHONPATH=src python3 -m unittest discover -s test -p "*.py"

# 単発実行の例
#  PYTHONPATH=src python -m unittest test.domain.test_LatLon
