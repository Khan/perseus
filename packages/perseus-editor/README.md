# @khanacademy/perseus-editor

The Perseus editor package contains components for editing Perseus content, but not for rendering Perseus content on its own. It is nevertheless very tightly coupled to perseus core.

Each core perseus widget type has a corresponding editor (defined in perseus-editor/widgets/), and there are also some extra example/test widgets defined in `./testing-widgets.js`.

Before using production widgets or editors, applications should call
`initPerseusEditor` from `@khanacademy/perseus-editor/init` once. The function
is idempotent.
