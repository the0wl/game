const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
            
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow color={0x9e69da}
      />
    </>
  );
}

export default Lights;