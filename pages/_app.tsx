import "../styles/global.css"

interface Props {
  Component: any
  pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps}></Component>
}

export default App
