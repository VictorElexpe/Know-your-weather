import Head from 'next/head'

export default function Home({data}) {
  return (
    <div className="container">
      <Head>
        <title>Know your weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {data.city}'s weather now
        </h1>

        <p className="description">
          {data.description}
        </p>

        <div className="grid">
          <div className="card">
            <h4>Temperature</h4>
            <p>{data.temp} ºC</p>
          </div>
          <div className="card">
            <h4>Humidity</h4>
            <p>{data.humidity} %</p>
          </div>
          <div className="card">
            <h4>Wind</h4>
            <p>{data.wind} Km/h</p>
          </div>
        </div>
      </main>

      <footer>
        Made by&nbsp;
        <a
          href="https://twitter.com/victorelexpe"
          target="_blank"
          rel="noopener noreferrer"
        >
          @victorelexpe
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          background-color: #000;
          color: #FFF;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          font-weight: 900;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        input {
          margin: 1rem;
          flex-basis: 45%;
          font-size: 1.5rem;
          padding: 1rem;
          text-align: left;
          background-color: #000;
          border: 1px solid #eaeaea;
          color: #FFF;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 50%;
          padding: 1.5rem;
          text-align: left;
          border: 1px solid #eaeaea;
          color: #FFF;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #9B9B9B;
          border-color: #9B9B9B;
        }

        .card h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: normal;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=52116dcd2be64132ede115a603a15c7c`)
  var data = await res.json()
console.log(data);

  const city = data.name;
  const description = data.weather[0].description;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = Math.round(data.wind.speed * 3.6);

  data = {
    "city": city,
    "description": description,
    "country": country,
    "temp": temp,
    "humidity": humidity,
    "wind": wind,
  }

  return { props: { data } }
}