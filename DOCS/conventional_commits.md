# General
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

1. `fix`: a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
2. `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
2. `BREAKING CHANGE`: a commit that has a footer BREAKING CHANGE:, or appends a `!` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends `build`:, `chore`:, `ci`:, `docs`:, `style`:, `refactor`:, `perf`:, `test`:, and others.
5. `footers` other than BREAKING CHANGE: `<description>` may be provided and follow a convention similar to git trailer format.

# Examples
```
feat: allow provided config object to extend other configs
```
```
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```
```
feat(api)!: send an email to the customer when a product is shipped
```
```
feat(lang): add Polish language
```
```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

# Branches
```
git branch <type>/<description>
```

Examples: 

* `main`: The main development branch (e.g., main, master, or develop)
* `feature`/: For new features (e.g., `feature/add-login-page`)
* `bugfix`/: For bug fixes (e.g., `bugfix/fix-header-bug`)
* `hotfix`/: For urgent fixes (e.g., `hotfix/security-patch`)
* `release`/: For branches preparing a release (e.g., `release/v1.2.0`)
* `chore`/: For non-code tasks like dependency, docs updates (e.g., `chore/update-dependencies`)