import React from "react";
import {
	Input,
	ListGroup,
	ListGroupItem,
	Modal,
	ModalHeader,
	Button,
	ModalFooter,
	ModalBody,
	Form,
	FormGroup,
} from "reactstrap";
import Axios from "axios";

export default function Todos({ todos, listItems, setListItems }) {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [updateTodo, setUpdateTodo] = React.useState("");
	const [isUpdating, setIsUpdating] = React.useState("");

	const updateItem = async () => {
		try {
			const res = await Axios.put(
				`http://localhost:8500/api/item/${isUpdating}`,
				{ item: updateTodo }
			);
			setUpdateTodo("");
			setIsUpdating("");
			closeModal();
			// console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async (id) => {
		try {
			const res = await Axios.delete(`http://localhost:8500/api/item/${id}`);
			const newListItems = listItems.filter((item) => item._id !== id);
			setListItems(newListItems);
		} catch (err) {
			console.log(err);
		}
	};

	function openModal(todo) {
		setIsOpen(true);
		setUpdateTodo(todo.item);
		setIsUpdating(todo._id);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className='mb-4'>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
				<ModalHeader toggle={closeModal}>Update Todo</ModalHeader>
				<ModalBody>
					<Form onSubmit={(e) => updateItem(e)}>
						<FormGroup>
							<Input
								type='text'
								value={updateTodo}
								onChange={(e) => setUpdateTodo(e.target.value)}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color='primary'>Update</Button>
					<Button onClick={closeModal}>Cancel</Button>
				</ModalFooter>
			</Modal>
			<ListGroup numbered>
				{todos.map((todo) => (
					<ListGroupItem key={todo._id}>
						{todo.item}
						<Button
							style={{ float: "right" }}
							className='mx-2'
							onClick={() => openModal(todo)}
						>
							Update
						</Button>
						<Button
							style={{ float: "right" }}
							color='danger'
							onClick={() => deleteItem(todo._id)}
						>
							Delete
						</Button>
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}
