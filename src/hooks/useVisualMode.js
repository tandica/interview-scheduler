export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  return { mode };
}
