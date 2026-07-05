// Dedicated entry point for Motion's DOM animation features, imported only via the
// lazy `import()` in main.tsx. Keeping this in its own module (rather than importing
// `domAnimation` from 'motion/react' directly) ensures the heavy feature graph is
// reachable solely through a dynamic import, so Rollup emits it as a separate async
// chunk instead of folding it into the eager bundle alongside `LazyMotion`.
export { domAnimation as default } from 'motion/react'
