export function ExpirienceBar() {
  return(
    <header className="expirience-bar">
      <span>0 xp</span>
      <div>
        <div style={{width: '60%'}}></div>
        <span className="current-expirience" style={{ left: '60%'}}>360 xp</span>
      </div>
      <span>600 xp</span>
    </header>
  );
}