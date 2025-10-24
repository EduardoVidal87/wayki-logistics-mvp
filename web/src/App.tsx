import {createRoot} from "react-dom/client"

function App(){
  return (
    <div style={{padding:24,fontFamily:"sans-serif"}}>
      <h1>Wayki Logistics</h1>
      <p>MVP listo. Próximo paso: conectar backend FastAPI.</p>
    </div>
  )
}

const rootEl = document.getElementById("root")!
createRoot(rootEl).render(<App/>)
