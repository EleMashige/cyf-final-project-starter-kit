import { useEffect, u, useState } from "react";
import { useParams } from "react-router-dom";
const  Dashboard = () => {
    const { name } = useParams();
	return (
		<div>
			<h1>Hello {name}</h1>
		</div>
	);
};
export default Dashboard;