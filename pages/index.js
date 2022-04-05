import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Franco Canevali</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <Link href="/posts">
            <p className="text-3xl underline">Test</p>
          </Link>
      </main>

      <footer></footer>

    </div>
  )
}
