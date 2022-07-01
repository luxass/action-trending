# action-trending

Use this Action to get the trending repositories/developers from GitHub.

## Usage

See [action.yml](action.yml)

### Basic

```yaml
# Developers
steps:
  - uses: actions/checkout@v3
  - uses: luxass/action-trending@v2
    with:
      type: developers
      date: weekly # daily, weekly, monthly (default: daily)
      sponsorable: true # (default: false)
      language: python
```

```yaml
# Repositories
steps:
  - uses: actions/checkout@v3
  - uses: luxass/action-trending@v2
    with:
      date: weekly # daily, weekly, monthly (default: daily)
      language: typescript
      spoken: da
```

### Matrix

```yaml
# Developers
jobs:
  trending:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: ["python", "javascript", "typescript"]
    name: Lang ${{matrix.lang}} Fetcher
    steps:
      - uses: actions/checkout@v3
      - uses: luxass/action-trending@v2
        with:
          type: developers
          date: weekly # daily, weekly, monthly (default: daily)
          sponsorable: true # (default: false)
          language: ${{matrix.lang}}

```

```yaml
# Repositories
jobs:
  trending:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: ["python", "javascript", "typescript"]
    name: Lang ${{matrix.lang}} Fetcher
    steps:
      - uses: actions/checkout@v3
      - uses: luxass/action-trending@v2
        with:
          date: weekly # daily, weekly, monthly (default: daily)
          spoken: da
          language: ${{matrix.lang}}
```
