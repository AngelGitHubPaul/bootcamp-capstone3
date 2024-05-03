import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AppFooter() {
	const location = useLocation();
	  const [isContentShort, setIsContentShort] = useState(false);

	  useEffect(() => {
	    const isLoginPage = location.pathname.includes('/login');

	    setIsContentShort(isLoginPage);
	  }, [location.pathname]);

	return (
		<footer 
			className="footer d-flex justify-content-center bg-primary text-white d-grid gap-5 p-3 mt-5"
			style={{ position: isContentShort ? 'fixed' : 'static', bottom: 0, left: 0, width: '100%' }}
		>
	        <div>&copy;  2024 Developers Profile.</div>
	        <div>|</div>
	        <div>All rights reserved.</div>
	    </footer>
	)
}