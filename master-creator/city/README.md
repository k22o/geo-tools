# 市区町村マスタ

## 作り方

- https://www.soumu.go.jp/denshijiti/code.html からExcelをDLする
- このディレクトリに配置する
- (ファイル名は勝手に検知するので、コードの修正は不要)

## フォーマット

- prefCode
- prefName
- cityCode
- cityName
- designated
  - 0: NOT_DESIGNATED
  - 1: DESIGNATED_PARENT
  - 2: DESIGNATED_CHILD
