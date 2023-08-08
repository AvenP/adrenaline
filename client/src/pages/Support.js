import { useState } from 'react';
import StripeContainer from './StripeContainer';
import handshake from "../assets/handshake.gif";


function Support() {
    const [showItem, setShowItem] = useState(false);
    return ( 
        <div className="Support">
            <h1>Support the Founders</h1>
            {showItem ? (
                <StripeContainer /> 
                ) : ( 
                <> 
                    <h3>$10.00</h3> 
                    <img src={handshake} alt="Handshake" />
					<button onClick={() => setShowItem(true)}>For GAINSZZZZZ</button>
				</>
			)}
		</div>
	);
}

export default Support;