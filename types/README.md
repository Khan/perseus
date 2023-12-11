Warning:

These type declarations are symlinked across each package.

So even if one package doesn't use it, we shouldn't remove any of these type declarations unless **none** of the packages are using it.

See: https://github.com/Khan/perseus/pull/842