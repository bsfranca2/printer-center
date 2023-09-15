import { Canvas } from '~/components/Canvas';

export function App() {
  return (
    <div className="dot-grid h-full w-full pt-8">
      <div className="flex justify-center">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
