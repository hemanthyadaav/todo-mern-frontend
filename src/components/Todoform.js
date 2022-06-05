import React, { useState, useEffect } from "react";
import { Form, FormGroup, InputGroup, Input, Button } from "reactstrap";
import Todos from "./Todos";
import Axios from "axios";

export default function Todoform() {
	const [itemText, setItemText] = useState("");
	const [listItems, setListItems] = useState([]);

	let count = 0;
	useEffect(() => {
		const getItemList = async () => {
			try {
				const res = await Axios.get("http://localhost:8500/api/items");
				setListItems(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getItemList();
	}, [listItems]);

	const addItem = async () => {
		if (itemText.trim() === "") {
			alert("Please enter a valid Todo");
			return;
		}
		try {
			const res = await Axios.post("http://localhost:8500/api/item", {
				item: itemText,
			});
			setListItems((prev) => [...prev, res.data]);
			// console.log(res.data);
			setItemText("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='container'>
			<h1 className='mt-5 text-center'>Todo Application</h1>
			<Form onSubmit={(e) => addItem(e)}>
				<FormGroup>
					<InputGroup className='mt-4'>
						<Input
							type='text'
							name='todo'
							id='todo'
							placeholder='Add Todo'
							value={itemText}
							onChange={(e) => setItemText(e.target.value)}
						/>
						<Button onClick={addItem} color='success'>
							Add Todo
						</Button>
					</InputGroup>
				</FormGroup>
			</Form>
			<Todos
				todos={listItems}
				listItems={listItems}
				setListItems={setListItems}
			/>
		</div>
	);
}
