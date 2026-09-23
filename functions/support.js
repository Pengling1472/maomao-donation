export default async ( request ) => {
	if ( request.method != 'POST' ) return Response.json( 'Method not allowed!', {
		status: 405
	} )

	try {
		const body = await request.json()
		const server = process.env.SERVER
		const client = process.env.CLIENT
		const response = await fetch( `${server}/api/maomao-stripe-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Origin": client
			},
			body: JSON.stringify( body )
		} )

		if ( !response.ok ) throw Error( await response.text() )

		const session = await response.json()
		
		return Response.json( session, {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		} )
	} catch ( err ) {
		return Response.json( err.message, {
			status: 400
		} )
	}
}