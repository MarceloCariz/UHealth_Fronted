
import { Provider } from 'react-redux'
import { Navigation } from './routes/Navigation'
import { store } from './store/store'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function App() {

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  )
}

export default App
