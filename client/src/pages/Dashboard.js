import { useEffect, useState } from "react";


const Dashboard = () => {
    const [name, setName] = useState("");

	useEffect(() => setName("Someone"),[]);

	return (
		<div>
			<h1>Hello {name}</h1>
		</div>
	);
};
export default Dashboard;