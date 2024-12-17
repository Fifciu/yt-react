import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import './GuestHome.css'

function GuestHome() {
  function redirectToGoogleOauth() {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.append('client_id', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    url.searchParams.append('redirect_uri', 'http://localhost:5173/oauthCallback');
    url.searchParams.append('response_type', 'token');
    
    url.searchParams.append('scope', 'https://www.googleapis.com/auth/youtube');
    window.location.href = url+'';
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>YouTube React Client</h1>
      <div className="card">
        <button onClick={redirectToGoogleOauth}>
          Sign in
        </button>
        <p>
          Your YT Account and start using this custom client.
        </p>
      </div>
      <p className="read-the-docs">
        Created for learning purpose
      </p>
    </>
  )
}

export default GuestHome
