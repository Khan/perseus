# perseus-testing

Testing related code used by Perseus.

## Coverage

There are a number of custom coverage reports that can be generated to help
identify gaps in test coverage for widgets and renderers.  These can be generated
by running the following commands from services/static/.

- yarn coverage:perseus-renderers
- yarn coverage:perseus-widgets90
- yarn coverage:perseus-widgets99

`renderers` collects coverage on the renderers and some of their key dependencies.
`widgets90` and `widgets99` collects coverage on widgets in the 90%-ile and 99%-ile
respectively and their key dependencies.

The coverage reports will appear in appropriately name subfolders within the
./coverage directory.

## Ownership

Code-Owner: Learning Platform
Crowdin-Category: content.chrome
