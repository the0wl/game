const WebGLNotSupported = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-zinc-900">
      <div className="flex flex-col justify-center items-center gap-6">
        <span className="text-zinc-300 text-6xl">💀</span>
        <h1 className="text-zinc-300 text-xl">WebGL not supported</h1>
      </div>
    </div>
  );
}

export default WebGLNotSupported;