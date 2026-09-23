export default async ( request ) => {
	if ( request.method != 'POST' ) return Response.json( 'Method not allowed!', {
		status: 405
	} )

	try {
		const server = process.env.SERVER
		const client = process.env.CLIENT
		const response = await fetch( `${server}/api/maomao-supporters`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Origin": client
			}
		} )

		if ( !response.ok ) throw Error( await response.text() )

		const supporters = await response.json()
		
		return Response.json( supporters, {
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