import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import rootBeer from "./assets/root_beer_mug.svg"
import profile from "./assets/profile.png"
import confetti from "canvas-confetti"

const audioFiles = Object.values( import.meta.glob( "./assets/root-beer/*.ogg", {
	eager: true
} ) as Record<string, { default: string }> ).map( value => value.default )

const supportersProfile = Object.values( import.meta.glob( "../public/supporters/*.png", {
	eager: true
} ) as Record<string, { default: string }> ).map( value => value.default )

const anonymousNames = [
	"BadBunny",
	"Dinner",
	"Oreo",
	"Cocaine"
]

interface supporterData {
	type: number
	name: string
	content: string
	private: boolean
	tip: number
	multiplier: number
}

export default function App() {
	const [ multiplierOptions, setMultiplierOptions ] = useState( [ {
		amount: 1,
		checked: true
	}, {
		amount: 3,
		checked: false
	}, {
		amount: 5,
		checked: false
	} ] )
	const tipAmount = useRef( 3 )
	const [ multiplier, setMultiplier ] = useState( 1 )
	const name = useRef( "" )
	const content = useRef( "" )
	const errorRef = useRef<HTMLDivElement>( null! )
	const [ surprise, setSurprise ] = useState( false )
	const [ roobeer, setRoobeer ] = useState( false )
	const [ privateMessage, setPrivateMessage ] = useState( false )
	const [ monthly, setMonthly ] = useState( false )
	const [ errorMessage, setErrorMessage ] = useState( "" )
	const [ supporters, setSupporters ] = useState<supporterData[]>( [] )
	const inputRef = useRef<HTMLInputElement>( null! )
	let roobeerAudio = useRef<HTMLAudioElement>( new Audio() )
	const canvasRef = useRef<HTMLCanvasElement>( null! )

	const { id } = useParams()

	function onKeyDown( event: React.ChangeEvent ) {
		const element = event.target as HTMLInputElement
		const text = element.value.replace( /[^0-9]/g, "" )
		const parsedText = text == "" ? 1 : parseInt( text )

		element.value = text

		setMultiplier( parsedText )
		setMultiplierOptions( current => current.map( value => ( { ...value, checked: parsedText == value.amount } ) ) )
	}

	function donationOption( event: React.MouseEvent ) {
		const element = event.target as HTMLInputElement

		setMultiplier( multiplierOptions[ parseInt( element.id ) ].amount )
		setMultiplierOptions( current => current.map( ( value, index ) => ( { ...value, checked: index == parseInt( element.id ) } ) ) )

		inputRef.current.value = multiplierOptions[ parseInt( element.id ) ].amount.toString()
	}

	function setError( text: string ) {
		setErrorMessage( text )
		
		errorRef.current.className = "error"

		setTimeout( () => {
			errorRef.current.className = "error error-slide-down"
		}, 20 );
	}

	async function createSession() {
		if ( name.current.length <= 0 ) return setError( "Missing name" )
		if ( content.current.length <= 0 ) return setError( "Missing message" )

		try {
			const data = await fetch( `/support`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify( {
					name: name.current,
					content: content.current,
					private: privateMessage,
					subscription: monthly,
					tip: tipAmount.current,
					multiplier: multiplier,
				} )
			} )

			if ( !data.ok ) throw new Error()

			window.location.href = ( await data.json() as { url: string } ).url
		} catch {
			setError( "No connection to the server" )
		}
	}

	const firstRender = useRef( false )

	useEffect( () => {
		if ( firstRender.current ) return

		firstRender.current = true
		
		if ( id == "success" ) {
			setSurprise( true )

			const confettiCanvas = confetti.create( canvasRef.current, {
				resize: true,
				useWorker: false
			} )
			const particle = confetti.shapeFromText( { text: "🍺", scalar: 2 } )

			confettiCanvas( {
				particleCount: 48,
				spread: 96,
				scalar: 3,
				shapes: [ particle ]
			} )
		}

		const fetchData = async () => {
			try {
				const data = await fetch( `/supporters`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				} )

				if ( !data.ok ) throw new Error()

				setSupporters( ( await data.json() as supporterData[] ).reverse() )
			} catch {
				setError( "No connection to the server" )
			}
		}

		fetchData()
	}, [] )

	return (
		<>
			<div className='background'/>
			<article className='panel'>
				<section>
					<h2 className='align-text'>Maomao</h2>
				</section>
				<section>
					<div className='profile'>
						<img src={ profile }/>
					</div>
				</section>
				<section>
					<h6 className='align-text'>Artist/Graphic Designer</h6>
					<p className='long-text'>{ "My name is Maomao. I love streaming gaming content, but outside of that I also do branding and motion designs! Your support will keep me going everyday <3" }</p>
				</section>
				<section>
					<div className='socials'>
						<a href="https://www.youtube.com/@livalil_tofu" target='_blank'>
							<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
						</a>
						<a href="https://discord.gg/ZkyAEmrche" target='_blank'>
							<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
						</a>
						<a href="https://www.instagram.com/liv.alil" target='_blank'>
							<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>
						</a>
						<a href="https://www.tumblr.com/maomaocabin" target='_blank'>
							<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tumblr</title><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/></svg>
						</a>
					</div>
				</section>
				<section>
					<h2>
						Buy Maomao a Root Beer!
					</h2>
					<p>
						{ "Support me and" } <b>I will draw you a bunny!</b> { "Write down how you would want your bunny to look like and then it will be in the background of this website! ヾ(>w<)o" }
					</p>
					<div className='donation-panel'>
						<img className={ `roobeer ${roobeer ? 'bounce' : ''}` } src={ rootBeer } onClick={ () => {
							if ( !roobeer ) {
								roobeerAudio.current.currentTime = 0
								roobeerAudio.current.volume = 0.2
								roobeerAudio.current.src = audioFiles[ Math.floor( Math.random() * audioFiles.length ) ]
								
								roobeerAudio.current.play()
							}
							
							setRoobeer( true )
						} } onAnimationEnd={ () => setRoobeer( false ) }/>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x" id="X--Streamline-Feather" height="16" width="16">
							<desc>
								X Streamline Icon: https://streamlinehq.com
							</desc>
							<path d="M11.25 3.75 3.75 11.25" stroke-width="1"></path>
							<path d="m3.75 3.75 7.5 7.5" stroke-width="1"></path>
						</svg>
						{
							multiplierOptions.map( ( value, index ) => ( <input type="button" data-checked={ `${value.checked}` } className='donation-option' key={ index } id={ index.toString() } onClick={ donationOption } value={ value.amount }/> ) )
						}
						<input type="text" placeholder='10' ref={ inputRef } onChange={ onKeyDown }/>
					</div>
					<input type="text" placeholder='Name or social' onChange={ ( event: React.ChangeEvent ) => {
						const element = event.target as HTMLInputElement

						name.current = element.value
					} }/>
					<textarea placeholder='Say something nice!' onChange={ ( event: React.ChangeEvent ) => {
						const element = event.target as HTMLInputElement

						content.current = element.value
					} }/>
					<div className='checkboxes'>
						<div className="checkbox" onClick={ () => setPrivateMessage( !privateMessage ) }>
							<input type="checkbox" checked={ privateMessage }/>
							<p>Private message</p>
						</div>
						<div className="checkbox" onClick={ () => setMonthly( !monthly ) }>
							<input type="checkbox" checked={ monthly }/>
							<p>Monthly support</p>
						</div>
					</div>
					<button onClick={ createSession }>
						Support ${ tipAmount.current * multiplier }{ monthly ? "/month" : "" }
					</button>
				</section>
				<section>
					<div className='supporters'>
						<div className='heart'>
							<span>
								<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1">
									<g transform="translate(0 -1028.4)">
										<path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"/>
									</g>
								</svg>
								<svg className='animated-heart' width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1">
									<g transform="translate(0 -1028.4)">
										<path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"/>
									</g>
								</svg>
							</span>
							<h4>Supporters!</h4>
						</div>
						<div className='items column'>
							{
								supporters.map( ( item, index ) => ( <div key={ index } className={ `supporter row ${ item.private ? "private" : !item.private && item.content.length == 0 ? "private" : "" }` }>
									<img src={ supportersProfile[ item.type ] }/>
									<div className='column'>
										<p>
											<b>{ item.name.length == 0 || item.private ? anonymousNames[ item.type ] : item.name }</b> bought { item.multiplier > 1 ? `${item.multiplier} root beers!` : "a root beer!" }
										</p>
										{
											( !item.private && ( item.private || item.content.length != 0 ) ) &&
											<p className='content'>
												{ item.content }
											</p>
										}
									</div>
								</div> ) )
							}
						</div>
					</div>
				</section>
				<footer>
					<p>&copy; 2026 Maomao | Made by Pengling</p>
				</footer>
			</article>
			<div className='error' ref={ errorRef }>
				<article className='panel'>
					<section>
						<h2>{ errorMessage }</h2>
					</section>
				</article>
			</div>
			{
				surprise && <div className='surprise'>
					<article className='panel'>
						<section>
							<h2>🎉 Thank You! 🎉</h2>
						</section>
						<section>
							<button onClick={ () => {
								setSurprise( false )
							} }>
								Close
							</button>
						</section>
					</article>
				</div>
			}
			<canvas ref={ canvasRef }></canvas>
		</>
	)
}