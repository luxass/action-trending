# action-trending

Use this Action to get the trending repositories/developers from GitHub.

## Usage

See [action.yml](action.yml)

### Basic

```yaml
# Developers
steps:
  - uses: actions/checkout@v3
  - uses: luxass/action-trending@v2.0.1
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
  - uses: luxass/action-trending@v2.0.1
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
    name: ${{matrix.language}} language
    steps:
      - uses: actions/checkout@v3
      - uses: luxass/action-trending@v2.0.1
        with:
          type: developers
          date: weekly # daily, weekly, monthly (default: daily)
          sponsorable: true # (default: false)
          language: ${{matrix.language}}

```

```yaml
# Repositories
jobs:
  trending:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: ["python", "javascript", "typescript"]
    name: ${{matrix.language}} language
    steps:
      - uses: actions/checkout@v3
      - uses: luxass/action-trending@v2.0.1
        with:
          date: weekly # daily, weekly, monthly (default: daily)
          spoken: da
          language: ${{matrix.language}}
```


### Output option
| Placeholder | Value                       |
|-------------|-----------------------------|
| cwd         | current working directory   |
| language    | language filter e.g. go     |
| unix        | current time in unix        |
| type        | repositories or developers  |
| spoken      | language spoken e.g. danish |
| date        | date range e.g. daily       |
| sponsorable | developer sponsorable       |