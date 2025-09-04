# Widget AI utils

> [!CAUTION]
> This code is not meant to be interwoven with Perseus' core logic.
> We want to keep it as isolated as possible from the rest of Perseus.

> [!CAUTION]
> Please be cautious making changes within this folder,
> it's an external API consumed by the team working on Khanmigo.

## Motivation

1. The team working on Khanmigo needed access to Perseus data for prompt engineering - including both external-facing things (like the ItemData and UserInput) and internal things (like widget props/state)
2. The Perseus team didn't want to write a blank check exposing all of our internal data because that would make it difficult for us to safely make internal changes
3. The goal of the helpers in this folder is to have a set of functions that can take _all_ the information the Khanmigo team could possibly want and return only the pieces the Khanmigo team needs

## What are these utilities for?

We want to have a representation of Perseus widgets that LLMs can understand. They understand JSON pretty well! This is a set of utility functions for each widget that get the minimum amount of data for an LLM to understand the state of the widget, as well as the current user input.


### Why don't we just pass the raw widget json?

We do not want to have the external API relying on the internal
representation of Perseus widgets. That would couple the widgets implementation to an external API, which would be subject to breakage. This approach balances having an explicit API, while keeping Perseus widgets mostly unaware of the LLM prompt requirements.
