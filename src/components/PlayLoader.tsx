import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import logo from '@/assets/nyesha-logo.webp.asset.json';
import { Button } from '@/components/ui/button';

function PlayingChild({ position, shirt, phase, skin }: { position: [number, number, number]; shirt: string; phase: number; skin: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.4 + phase) * 0.25;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2.5 + phase) * 0.12;
    }
  });
  return <group position={position} ref={ref}>
    <mesh position={[0, 1.13, 0]} castShadow><sphereGeometry args={[0.32, 20, 16]} /><meshStandardMaterial color={skin} roughness={0.8} /></mesh>
    <mesh position={[0, 1.38, -0.03]} castShadow><sphereGeometry args={[0.28, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.53]} /><meshStandardMaterial color="#352723" roughness={1} /></mesh>
    <mesh position={[-0.12, 1.16, 0.28]}><sphereGeometry args={[0.025, 8, 8]}/><meshStandardMaterial color="#302723"/></mesh>
    <mesh position={[0.12, 1.16, 0.28]}><sphereGeometry args={[0.025, 8, 8]}/><meshStandardMaterial color="#302723"/></mesh>
    <mesh position={[0, 1.01, 0.3]} rotation-x={Math.PI/2}><torusGeometry args={[0.065, 0.012, 6, 12, Math.PI]}/><meshStandardMaterial color="#a34b47"/></mesh>
    <mesh position={[0, 0.61, 0]} castShadow><capsuleGeometry args={[0.28, 0.36, 5, 12]} /><meshStandardMaterial color={shirt} roughness={0.9} /></mesh>
    {[-1,1].map(side => <group key={side}>
      <mesh position={[side * 0.39, 0.7, 0]} rotation-z={side * 0.6} castShadow><capsuleGeometry args={[0.09, 0.27, 4, 8]} /><meshStandardMaterial color={skin} /></mesh>
      <mesh position={[side * 0.14, 0.17, 0]} castShadow><capsuleGeometry args={[0.11, 0.28, 4, 8]} /><meshStandardMaterial color="#356b83" /></mesh>
    </group>)}
  </group>;
}
function PlayScene() {
  const ball = useRef<THREE.Mesh>(null);
  const play = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (play.current) play.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
    if (ball.current) {
      ball.current.position.x = Math.sin(state.clock.elapsedTime * 1.6) * 0.9;
      ball.current.position.y = 0.27 + Math.abs(Math.sin(state.clock.elapsedTime * 2.5)) * 0.4;
      ball.current.rotation.z = state.clock.elapsedTime;
    }
  });
  return <>
    <color attach="background" args={['#d9f4ec']} />
    <ambientLight intensity={1.3} />
    <directionalLight position={[3, 7, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <Environment><Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} /></Environment>
    <group ref={play}>
    <mesh rotation-x={-Math.PI / 2} receiveShadow><circleGeometry args={[3.2, 48]} /><meshStandardMaterial color="#f9dfba" roughness={1} /></mesh>
    <mesh position={[0, 0.04, -0.6]} rotation-x={-Math.PI/2} receiveShadow><planeGeometry args={[3.6, 1.2]}/><meshStandardMaterial color="#80ccc1" roughness={1}/></mesh>
    {([{ x: -1.4, color: '#f28f82' }, { x: -0.8, color: '#f5be58' }, { x: -0.2, color: '#70c8b1' }, { x: 0.4, color: '#67a5cf' }, { x: 1, color: '#ed6961' }]).map((step, i) => <mesh key={step.x} position={[step.x, 0.07, 1.35 + Math.sin(i) * .18]} receiveShadow><cylinderGeometry args={[.28, .32, .12, 24]}/><meshStandardMaterial color={step.color} roughness={.85}/></mesh>)}
    <PlayingChild position={[-1.05, 0, 0]} shirt="#ed6961" phase={0} skin="#d9986f" />
    <PlayingChild position={[1.05, 0, -0.3]} shirt="#188ca7" phase={2} skin="#b97753" />
    <mesh ref={ball} position={[0, 0.3, 0.8]} castShadow><sphereGeometry args={[0.27, 24, 18]} /><meshStandardMaterial color="#f4bd42" roughness={0.65} /></mesh>
    {([{x: -2.25, color: '#70c8b1'}, {x: -1.55, color: '#f5be58'}, {x: 1.55, color: '#f28f82'}, {x: 2.25, color: '#67a5cf'}]).map((block, i) => <mesh key={i} position={[block.x, 0.13, -0.75]} castShadow rotation-y={i * .3}><boxGeometry args={[0.55, 0.26, 0.55]} /><meshStandardMaterial color={block.color} /></mesh>)}
    <mesh position={[-2.15, 0.36, 0.7]} rotation-x={-Math.PI/2}><torusGeometry args={[0.33, .08, 8, 24]}/><meshStandardMaterial color="#ec8d78" /></mesh>
    <mesh position={[2.15, 0.36, 0.7]} rotation-x={-Math.PI/2}><torusGeometry args={[0.33, .08, 8, 24]}/><meshStandardMaterial color="#6dbcb1" /></mesh>
    </group>
  </>;
}
export function PlayLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('nyesha-intro-seen')) { setVisible(false); return; }
    setMounted(true);
    const timer = window.setTimeout(() => { setVisible(false); sessionStorage.setItem('nyesha-intro-seen', '1'); }, 4800);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="play-loader" role="status" aria-label="Loading Nayesha Childcare">
    <div className="loader-topline"><img className="loader-logo" src={logo.url} alt="Nayesha Childcare" /><span>LET'S PLAY & GROW</span></div>
    <div className="play-loader-scene">
      {mounted && <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 3.5, 6.5], fov: 43 }}><PlayScene /></Canvas>}
    </div>
    <div className="loader-bottomline"><p>Small steps.<br/><em>Big discoveries.</em></p><div className="loader-progress" aria-hidden="true"><span/></div></div>
    <Button variant="ghost" className="loader-skip" onClick={() => { sessionStorage.setItem('nyesha-intro-seen', '1'); setVisible(false); }}>Skip intro</Button>
  </div>;
}
