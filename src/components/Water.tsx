const Water = () => {
  return (
    <mesh position={[0, -0.5, 0]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="rgb(59, 130, 246)" />
    </mesh>
  );
}

export default Water;