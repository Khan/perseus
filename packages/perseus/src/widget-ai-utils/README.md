# What are these utilities for?

We want to have a representation of Perseus widgets that LLMs can understand.
They understand JSON pretty well! This is a set of utility functions for each
widget that get the minimum amount of data for an LLM to understand the state
of the widget, as well as the current user input.


### Why don't we just pass the raw widget json?

We do not want to have the an external API relying on the internal
representation of Perseus widgets. That would couple the widgets implementation
to an external API, which would be subject to breakage. This approach balances
having an explicit API, while keeping Perseus widgets mostly unaware of the
LLM prompt requirements.
