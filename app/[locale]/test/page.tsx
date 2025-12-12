export default function TestPage() {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="section-wrapper" style={{ height: '200vh', position: 'relative' }}>
          <section
            className="main-section"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              zIndex: 10,
              backgroundColor: '#FF6B6B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white' }}>Section 1</h1>
          </section>
        </div>

        <div className="section-wrapper" style={{ height: '200vh', position: 'relative' }}>
          <section
            className="main-section"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              zIndex: 20,
              backgroundColor: '#4ECDC4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white' }}>Section 2</h1>
          </section>
        </div>

        <div className="section-wrapper" style={{ height: '200vh', position: 'relative' }}>
          <section
            className="main-section"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              zIndex: 30,
              backgroundColor: '#45B7D1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white' }}>Section 3</h1>
          </section>
        </div>

        <div className="section-wrapper" style={{ height: '100vh', position: 'relative' }}>
          <section
            className="main-section"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              zIndex: 40,
              backgroundColor: '#FFA07A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white' }}>Section 4</h1>
          </section>
        </div>
      </body>
    </html>
  );
}
