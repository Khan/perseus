# perseus-linter

The linter is implemented by the following files:

tree-transformer.js:

  This file defines a TreeTransformer class for traversing (and
  optionally transforming by inserting, reparenting and removing
  nodes) markdown parse trees. When traversing a tree, a
  TreeTransformer calls the function you specify on each node. This is
  a post-order traversal: the function is called on the way back up,
  not on the way down. When the function is invoked, it is passed the
  current node, a state object, and the concatenated content of the
  node and its descendants.  The state object is the interesting one:
  it is an instance of TraversalState, which is a class defined in
  (but not exported by) this same file. TraversalState has an API for
  querying the ancestors and siblings of the current node, and also an
  API for replacing the current node with a new one.

selector.js:

  This file defines the Selector class which works like a CSS selector
  for markdown parse trees. Selector.parse() converts strings like
  "heading + paragraph > text" to Selector objects. A Selector object
  has a match() method that tests whether a given node in a parse tree
  matches. The match() method takes a TraversalState object as its
  argument, so selectors can only be used during a TreeTransformer
  traversal.

rule.js:

  This file defines the Rule class which represents a single lint
  rule. A Rule object has a check() method that takes the same (node,
  state, content) arguments that a TreeTransformer passes to the
  traversal callback function. Rules can have a selector, a regular
  expression, and a function. If a node matches the selector and its
  content matches the regular expression, then the function is called
  to check the node and return a warning message if the node does, in
  fact, have lint.

See the individual file for additional documentation.
