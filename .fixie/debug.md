# Fixie debug notes

## Cypress cannot run from the sandboxed Bash tool

Invoking the verify command's Cypress step directly from the agent's Bash tool
fails before any test executes:

```
[FATAL:mach_port_rendezvous.cc(148)] Check failed: kr == KERN_SUCCESS.
bootstrap_check_in com.electron.cypress.MachPortRendezvousServer...: Permission denied (1100)
The Test Runner unexpectedly exited via a exit event with signal SIGTRAP
```

This is an OS sandbox restriction on Electron's mach-port rendezvous, not a code
problem. The verify hook runs the same command *outside* the sandbox, where
Cypress launches and runs normally, so verification still works end-to-end — I
just can't iterate on Cypress changes from the Bash tool. `pnpm linc` and
`pnpm typecheck` do run fine from the Bash tool.

If direct Cypress runs from the Bash tool are wanted, the sandbox would need to
permit Electron to create its mach bootstrap port.
