# Crash Course Refactoring Plans

This folder contains the planning documents for refactoring the Crash Course (formerly Math Blaster) educational game.

## Core Documents

- **[CRASH_COURSE_CONCEPT.md](./CRASH_COURSE_CONCEPT.md)** - High-level architecture vision and game engine design
- **[CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)** - Overview of the 5-phase refactoring plan
- **[REFACTORING_PLAN_SUMMARY.md](./REFACTORING_PLAN_SUMMARY.md)** - Explains what changed from the original plan and why

## Phase Documents

- **[PHASE_0_testing_foundation.md](./PHASE_0_testing_foundation.md)** - Testing infrastructure and baselines (8 tasks, 2-3 hours)
- **[PHASE_1_setup_assets_architecture.md](./PHASE_1_setup_assets_architecture.md)** - Directory setup and API design (15 tasks, 2-3 hours)
- **[PHASE_2_build_engine.md](./PHASE_2_build_engine.md)** - Build game engine and sprite system (20 tasks, 5-7 hours)
- **[PHASE_3_ui_components.md](./PHASE_3_ui_components.md)** - React UI components and integration (13 tasks, 2-3 hours)
- **[PHASE_4_documentation_polish.md](./PHASE_4_documentation_polish.md)** - Documentation and polish (15 tasks, 4.5-5 hours)

## Total Effort

**71 tasks across 5 phases, 16-21 hours**

## Key Decisions

1. **Custom Game Engine**: Pure TypeScript engine separate from React (eliminates hook complexity)
2. **Multi-Entity Sprite System**: Built from the start to prevent future refactoring
3. **Testing First**: Phase 0 establishes baselines before any refactoring
4. **Reusable Systems**: RenderSystem, AudioSystem, AssetLoader, Perseus integration interface
5. **YAGNI Principle**: Build what's needed now, extract to shared/ when game #2 needs it

## Getting Started

1. Read [REFACTORING_PLAN_SUMMARY.md](./REFACTORING_PLAN_SUMMARY.md) for context
2. Review [CRASH_COURSE_CONCEPT.md](./CRASH_COURSE_CONCEPT.md) for architecture
3. Start with [PHASE_0_testing_foundation.md](./PHASE_0_testing_foundation.md)

## Documentation Created During Refactoring

As you work through the phases, additional documentation will be created in this folder:
- `PERFORMANCE_BASELINE.md` - Performance metrics (Phase 0)
- `ORIGINAL_BEHAVIOR.md` - Current game behavior documentation (Phase 0)
- `MANUAL_TEST_CHECKLIST.md` - Manual testing checklist (Phase 4)
- `MIGRATION.md` - Refactoring changes for reviewers (Phase 4, temporary)
- `PR_CHECKLIST.md` - Pull request checklist (Phase 4, temporary)
